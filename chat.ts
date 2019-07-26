import * as express from 'express'
import * as http from 'http'
import * as socketIO from 'socket.io'
import * as path from 'path'
//import * as type from './proto_gen/type_pb.d'
 
const app = express()
const server = http.createServer(app)
const io = socketIO.listen(server)
//const roomtype = new type.type()

app.set("port", 3000)

app.get('/', function(req:any, res:any) {
    res.sendFile(path.resolve("./html/openchat.html"))
})
app.get('/groupchat', function(req:any, res:any) {
    res.sendFile(path.resolve("./html/groupchat.html"))
})

server.listen(3000, () => {
    console.log('Listening port %s', 3000);
})

let userlist:string[][] = []
let roomlist:string[][] = [['abc'], ['bb'], ['ccc']]
const openchat = io.of('/openchat')
const groupchat = io.of('/groupchat')
const privacychat = io.of('/privacychat')

 
console.log(roomlist)

// OPENCHAT NAMESPACE
openchat.on('connection', function(socket){
  console.log('Someone Connected : ', socket.id)
  socket.on('testmsg', function(msg:string){
    console.log(msg)
  })
  // SET NAME
  socket.on('setname', function(name:string){ 
    userlist.push([socket.id, name]) // id, name 배열에 추가
    io.to(socket.id).emit('setname',name);
    socket.broadcast.emit('to_client_message', '[' + name + ']' + '님이 입장하였습니다.')
    socket.emit('to_client_message', '[' + name + ']' + '님이 입장하였습니다.')
    socket.broadcast.emit('totaluser', userlist.length.toString())
    socket.emit('totaluser', userlist.length.toString())
  })

  // RECEIVE MESSAGE & RETURN MESSAGE
  socket.on('from_client_message', function(name:string,text:string){
    if(text != ''){ // 공백 막아보리기
      let msg = name + ' : ' + text;
      console.log(msg);
    socket.emit('to_client_message', msg);
    socket.broadcast.emit('to_client_message', msg);
    }
  })

  // DISCONNECT
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
  })
})

// GROUPCHAT NAMESPACE (issue : 방을 변경하면 이전 방의 데이터까지 볼 수 있음.)
groupchat.on('connection', function(socket){
  let flag = false;
  console.log('Someone Connected : ', socket.id)

  // CHECK GROUP
  socket.on('chkgroupid', function(groupid:string){
    for(let i=0;i<roomlist.length;i++){
      if(roomlist[i][0] == groupid){ flag = true }
    }
    if(flag == true){
      socket.emit('to_client_message', '[' + groupid + ']' + '방 문앞입니다. ')
      socket.emit('to_client_message', '입장하실 Username을 입력해주세요.')
    }else if(flag == false){ socket.emit('grouperror', 'no id')}
  })

  // SET USERNAME
  socket.on('setname', function(groupid:string, name:string){ 
    socket.join(groupid)
    socket.to(groupid).emit('to_client_message', '[' + name + ']' + '님이 입장하였습니다.')
  })

  // RECEIVE MESSAGE & RETURN MESSAGE
  socket.on('from_client_message', function(groupid:string, name:string,text:string){
    let msg = name + ' : ' + text
    socket.emit('to_client_message', msg)
    socket.to(groupid).emit('to_client_message', msg)
  })

  // DISCONNECT
  socket.on('disconnect', function(){
    console.log('user disconnected: ', socket.id);
    /*
    // id로 name 찾기
    for(let i:number=0;i<userlist.length;i++){
        if(userlist[i][0] == socket.id){ 
            let name:string = userlist[i][1]
            userlist.splice(i)
            socket.broadcast.emit('totaluser', userlist.length.toString())
            socket.broadcast.emit('to_client_message', '[' + name + ']' + '님이 퇴장하였습니다.')
        }
    }
    */
  })
})

// PRIVACYCHAT NAMESPACE
privacychat.on('connection', function(socket){
  console.log('Someone Connected : ', socket.id)
})
