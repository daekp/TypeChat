// package: 
// file: generated/type.proto

import * as jspb from 'google-protobuf';

export class Roomtype extends jspb.Message {
  hasPrivacy(): boolean;
  clearPrivacy(): void;
  getPrivacy(): string | undefined;
  setPrivacy(value: string): void;

  hasGroup(): boolean;
  clearGroup(): void;
  getGroup(): string | undefined;
  setGroup(value: string): void;

  hasOpen(): boolean;
  clearOpen(): void;
  getOpen(): string | undefined;
  setOpen(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Roomtype.AsObject;
  static toObject(includeInstance: boolean, msg: Roomtype): Roomtype.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Roomtype, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Roomtype;
  static deserializeBinaryFromReader(message: Roomtype, reader: jspb.BinaryReader): Roomtype;
}

export namespace Roomtype {
  export type AsObject = {
    privacy?: string,
    group?: string,
    open?: string,
  }
}

export class Permission extends jspb.Message {
  hasAdministrator(): boolean;
  clearAdministrator(): void;
  getAdministrator(): string | undefined;
  setAdministrator(value: string): void;

  hasAsd(): boolean;
  clearAsd(): void;
  getAsd(): string | undefined;
  setAsd(value: string): void;

  hasOpen(): boolean;
  clearOpen(): void;
  getOpen(): string | undefined;
  setOpen(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Permission.AsObject;
  static toObject(includeInstance: boolean, msg: Permission): Permission.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Permission, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Permission;
  static deserializeBinaryFromReader(message: Permission, reader: jspb.BinaryReader): Permission;
}

export namespace Permission {
  export type AsObject = {
    administrator?: string,
    asd?: string,
    open?: string,
  }
}

