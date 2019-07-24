import * as express from 'express'
import * as http from 'http'
import * as socketSession from 'express-socket.io-session'
import * as socketIO from 'socket.io'
import * as path from 'path'
import { appendFileSync } from 'fs';
 
const app = express()
const server = http.createServer(app);
const io = socketIO.listen(server)
const session = socketSession(io)

app.set("port", 3000)

app.get('/', function(req:any, res:any) {
    res.sendFile(path.resolve("./html/openchat.html"));
})

app.get('/openchat', function(req:any, res:any) {
    res.sendFile(path.resolve("./html/openchat.html"));
})

/*
app.get('/privacychat', function(req:any, res:any) {
    res.sendFile(path.resolve("./html/privacychat.html"));
})
app.get('/groupchat', function(req:any, res:any) {
    res.sendFile(path.resolve("./html/groupchat.html"));
})
*/

let userlist:string[][] = [] 
io.on('connection', function(socket){
  console.log('user connected: ', socket.id);

  socket.emit('totaluser', userlist.length.toString())

  socket.on('setname', function(name){
    userlist.push([socket.id, name]) // id, name 배열에 추가
    io.to(socket.id).emit('setname',name);
    socket.broadcast.emit('to_client_message', '[' + name + ']' + '님이 입장하였습니다.')
    socket.emit('to_client_message', '[' + name + ']' + '님이 입장하였습니다.')
    socket.broadcast.emit('totaluser', userlist.length.toString())
    socket.emit('totaluser', userlist.length.toString())
  })

  socket.on('disconnect', function(){
    console.log('user disconnected: ', socket.id);
    // id로 name 찾기
    for(let i:number=0;i<userlist.length;i++){
        if(userlist[i][0] == socket.id){ 
            let name:string = userlist[i][1]
            userlist.splice(i)
            socket.broadcast.emit('totaluser', userlist.length.toString())
            socket.broadcast.emit('to_client_message', '[' + name + ']' + '님이 퇴장하였습니다.')
        }
    }
  });
  
  socket.on('from_client_message', function(name,text){
    if(text != ''){ // 공백 막아보리기
      let msg = name + ' : ' + text;
      console.log(msg);
      io.emit('to_client_message', msg);
    }
  });
});
server.listen(3000, () => {
    console.log('Listening port %s', 3000);
})

