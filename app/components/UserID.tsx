import { auth } from "@/firebaseConfig";

const UserID: React.FC = () => {
  const copyIDToClipboard = () => {
    if (!auth.currentUser) return;
    navigator.clipboard.writeText(auth.currentUser.uid);
  };

  return (
    <button
      onClick={copyIDToClipboard}
      className="absolute bottom-12 left-2 text-gray-200 bg-gray-900 h-9 w-52 text-lg font-medium uppercase transition-colors hover:bg-gray-800"
    >
      Copy Your ID
    </button>
  );
};

export default UserID;
