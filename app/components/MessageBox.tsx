import { IFriend } from "@/types";
import MessageList from "./MessageList";
import SendMessage from "./SendMessage";

interface Props {
  currentFriend: IFriend | null;
  addMessage: (text: string) => void;
}

const MessageBox: React.FC<Props> = ({ currentFriend, addMessage }) => {
  return (
    <div className="ml-56">
      {currentFriend && (
        <>
          <MessageList messages={currentFriend.messages} />
          <SendMessage addMessage={addMessage} />
        </>
      )}
    </div>
  );
};

export default MessageBox;
