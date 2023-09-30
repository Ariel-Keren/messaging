import { auth } from "@/firebaseConfig";
import { IMessage } from "@/types";

interface Props {
  message: IMessage;
}

const Message: React.FC<Props> = ({ message }) => {
  const date = new Date(message.dateSent);
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const monthDate = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const dateString = `${month} ${monthDate} • ${hours}:${minutes}`;
  const isMessageSentByUser =
    message.senderName === auth.currentUser?.displayName;

  return (
    <div
      className={`flex flex-col ${
        isMessageSentByUser ? "items-start" : "items-end"
      }`}
    >
      <p
        className={`text-sm text-gray-200 ${
          isMessageSentByUser ? "ml-1" : "mr-1"
        }`}
      >
        {message.senderName}
      </p>
      <div className="bg-gray-950 p-3 rounded-lg min-w-[200px] max-w-[85%]">
        <p className="break-words text-gray-400">{message.text}</p>
        <p className="text-sm text-gray-600 font-medium">{dateString}</p>
      </div>
    </div>
  );
};

export default Message;
