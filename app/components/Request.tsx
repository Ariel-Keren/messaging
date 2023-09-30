interface Props {
  name: string;
  id: string;
  accept: (id: string) => void;
  decline: (id: string) => void;
}

const Request: React.FC<Props> = ({ name, id, accept, decline }) => {
  const acceptThisRequest = () => accept(id);
  const declineThisRequest = () => decline(id);

  return (
    <div className="flex flex-col items-center bg-gray-900 py-3 rounded w-11/12">
      <p className="text-gray-300 font-medium">{name}</p>
      <div className="flex gap-1">
        <button
          onClick={acceptThisRequest}
          className="text-gray-400 p-1 rounded font-medium uppercase hover:bg-gray-800"
        >
          Accept
        </button>
        <button
          onClick={declineThisRequest}
          className="text-gray-400 p-1 rounded font-medium uppercase hover:bg-gray-800"
        >
          Decline
        </button>
      </div>
    </div>
  );
};

export default Request;
