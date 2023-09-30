interface Props {
  name: string;
  id: string;
  onFriendClick: (id: string) => void;
}

const Friend: React.FC<Props> = ({ name, id, onFriendClick }) => {
  const onThisFriendClick = () => onFriendClick(id);

  return (
    <button
      onClick={onThisFriendClick}
      className="text-gray-200 bg-gray-900 h-9 w-full transition-colors hover:bg-gray-800"
    >
      {name}
    </button>
  );
};

export default Friend;
