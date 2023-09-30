export interface IRequest {
  name: string;
  id: string;
}

export interface IMessage {
  text: string;
  senderName: string;
  dateSent: number;
}

export interface IFriend {
  name: string;
  id: string;
  messages: IMessage[];
}
