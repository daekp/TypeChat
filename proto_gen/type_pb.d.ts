// package: 
// file: proto_gen/type.proto

import * as jspb from 'google-protobuf';

export class type extends jspb.Message {
  hasRoomtype(): boolean;
  clearRoomtype(): void;
  getRoomtype(): string | undefined;
  setRoomtype(value: string): void;

  hasPermission(): boolean;
  clearPermission(): void;
  getPermission(): string | undefined;
  setPermission(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): type.AsObject;
  static toObject(includeInstance: boolean, msg: type): type.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: type, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): type;
  static deserializeBinaryFromReader(message: type, reader: jspb.BinaryReader): type;
}

export namespace type {
  export type AsObject = {
    roomtype?: string,
    permission?: string,
  }
}

