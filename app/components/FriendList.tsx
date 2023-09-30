import { IFriend } from "@/types";
import Friend from "./Friend";

interface Props {
  friends: IFriend[];
  onFriendClick: (id: string) => void;
}

const FriendList: React.FC<Props> = ({ friends, onFriendClick }) => {
  return (
    <div className="flex flex-col items-center w-full mb-3">
      <h2 className="text-lg font-medium text-gray-100 uppercase">Friends</h2>
      {friends.map((friend) => (
        <Friend
          name={friend.name}
          id={friend.id}
          onFriendClick={onFriendClick}
          key={friend.id}
        />
      ))}
    </div>
  );
};

export default FriendList;
