import { IFriend } from "@/types";

interface Props {
  currentFriend: IFriend | null;
  closeFriend: () => void;
}

const Header: React.FC<Props> = ({ currentFriend, closeFriend }) => {
  return (
    <div className="flex justify-center ml-56 p-5 bg-gray-950">
      <h1 className="text-2xl font-medium text-gray-100">
        {currentFriend?.name ?? "No Friend Selected"}
      </h1>
      {currentFriend && (
        <button
          onClick={closeFriend}
          className="absolute top-4 right-5 text-gray-400 text-3xl"
        >
          x
        </button>
      )}
    </div>
  );
};

export default Header;
