import { IRequest } from "@/types";
import Request from "./Request";

interface Props {
  requests: IRequest[];
  accept: (id: string) => void;
  decline: (id: string) => void;
}

const RequestList: React.FC<Props> = ({ requests, accept, decline }) => {
  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-lg font-medium text-gray-100 uppercase">Requests</h2>
      {requests.map((request) => (
        <Request
          name={request.name}
          id={request.id}
          accept={accept}
          decline={decline}
          key={request.id}
        />
      ))}
      {requests.length === 0 && (
        <p className="text-gray-600 font-medium">No Requests</p>
      )}
    </div>
  );
};

export default RequestList;
