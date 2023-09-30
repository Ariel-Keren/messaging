import { IFriend, IRequest } from "@/types";
import FriendList from "./FriendList";
import RequestList from "./RequestList";
import SendRequest from "./SendRequest";
import UserID from "./UserID";
import SignOut from "./SignOut";

interface Props {
  friends: IFriend[];
  onFriendClick: (id: string) => void;
  requests: IRequest[];
  accept: (id: string) => void;
  decline: (id: string) => void;
}

const Sidebar: React.FC<Props> = ({
  friends,
  onFriendClick,
  requests,
  accept,
  decline,
}) => {
  return (
    <>
      <div className="absolute top-0 left-0 flex flex-col items-center h-screen w-56 p-2 bg-gray-950">
        <FriendList friends={friends} onFriendClick={onFriendClick} />
        <RequestList requests={requests} accept={accept} decline={decline} />
      </div>
      <SendRequest />
      <UserID />
      <SignOut />
    </>
  );
};

export default Sidebar;
