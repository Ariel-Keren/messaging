import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Authentication: React.FC = () => (
  <div className="absolute top-1/3 left-1/2 -translate-y-1/3 -translate-x-1/2">
    <SignIn />
    <SignUp />
  </div>
);

export default Authentication;
