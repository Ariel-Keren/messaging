import { auth } from "@/firebaseConfig";

const SignOut: React.FC = () => {
  const signOut = () => auth.signOut();

  return (
    <button
      onClick={signOut}
      className="absolute bottom-2 left-2 text-gray-200 bg-gray-900 h-9 w-52 text-lg font-medium uppercase transition-colors hover:bg-gray-800"
    >
      Sign Out
    </button>
  );
};

export default SignOut;
