import { auth, database } from "@/firebaseConfig";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { ChangeEvent, useState } from "react";
import { IRequest } from "@/types";

const SendRequest: React.FC = () => {
  const [id, setID] = useState("");

  const changeID = (event: ChangeEvent<HTMLInputElement>) =>
    setID(event.target.value);

  const send = async () => {
    if (!auth.currentUser || !auth.currentUser.displayName) return;

    if (id.replaceAll(" ", "") === "") {
      alert("Invalid ID");
      return;
    }

    const reference = doc(database, `users/${id}`);
    const newRequest: IRequest = {
      name: auth.currentUser.displayName,
      id: auth.currentUser.uid,
    };

    try {
      await updateDoc(reference, { requests: arrayUnion(newRequest) });
    } catch {
      alert("User does not exist");
      return;
    }

    alert("Request sent");
  };

  return (
    <div className="absolute bottom-20 left-0 flex flex-col items-center gap-2 w-56 p-2">
      <input
        placeholder="Type ID..."
        value={id}
        onChange={changeID}
        className="w-full bg-transparent text-gray-100 border-b-2 border-b-gray-800 outline-none"
      />
      <button
        onClick={send}
        className="text-gray-200 bg-gray-900 h-9 w-full text-lg font-medium uppercase transition-colors hover:bg-gray-800"
      >
        Send Request
      </button>
    </div>
  );
};

export default SendRequest;
