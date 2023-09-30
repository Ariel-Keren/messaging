import { ChangeEvent, useState } from "react";

interface Props {
  addMessage: (text: string) => void;
}

const SendMessage: React.FC<Props> = ({ addMessage }) => {
  const [message, setMessage] = useState("");

  const changeMessage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 500) return;
    setMessage(event.target.value);
  };

  const sendAndClear = () => {
    setMessage("");
    addMessage(message);
  };

  return (
    <div className="absolute bottom-0 left-56 flex items-center gap-5 bg-gray-950 h-12 w-[calc(100%-224px)] p-2">
      <input
        placeholder="Type message..."
        value={message}
        onChange={changeMessage}
        className="h-10 w-full bg-gray-950 text-gray-300 border-b-2 border-b-gray-500 border-r-gray-500 outline-none"
      />
      <button
        onClick={sendAndClear}
        className="h-10 w-36 bg-white bg-opacity-10 rounded text-gray-200 text-xl font-medium uppercase transition-all hover:bg-opacity-20"
      >
        Send
      </button>
    </div>
  );
};

export default SendMessage;
