import { IMessage } from "@/types";
import Message from "./Message";

interface Props {
  messages: IMessage[];
}

const MessageList: React.FC<Props> = ({ messages }) => {
  return (
    <div className="flex flex-col gap-2 max-h-[calc(100vh-120px)] overflow-y-scroll p-4">
      {messages.map((message, index) => (
        <Message message={message} key={index} />
      ))}
    </div>
  );
};

export default MessageList;
