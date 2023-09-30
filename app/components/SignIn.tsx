import { auth, database, signInWithGoogle } from "@/firebaseConfig";
import { IFriend, IRequest } from "@/types";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ChangeEvent, useState } from "react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const changeEmail = (event: ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);

  const changePassword = (event: ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  const signIn = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch {
      alert("Failed to sign in");
    }
  };

  const continueWithGoogle = async () => {
    try {
      await signInWithGoogle();
    } catch {
      alert("Failed to sign in");
      return;
    }

    if (!auth.currentUser) {
      alert("Failed to sign in");
      return;
    }

    const reference = doc(database, `users/${auth.currentUser.uid}`);

    try {
      await setDoc(reference, {
        friends: [] as IFriend[],
        requests: [] as IRequest[],
      });
    } catch {
      alert("Failed to update the database");
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="flex flex-col items-center gap-5 h-96 w-96 p-10 bg-gray-950 rounded">
        <h2 className="text-gray-100 text-xl font-medium uppercase">
          Already Have an Account?
        </h2>

        <form className="flex flex-col gap-2">
          <div className="flex flex-col">
            <label htmlFor="sign-in-email" className="text-gray-100">
              Email
            </label>
            <input
              id="sign-in-email"
              value={email}
              onChange={changeEmail}
              className="p-1 rounded-sm"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="sign-in-password" className="text-gray-100">
              Password
            </label>
            <input
              type="password"
              id="sign-in-password"
              value={password}
              onChange={changePassword}
              className="p-1 rounded-sm"
            />
          </div>

          <button
            onClick={signIn}
            className="text-gray-100 bg-gray-800 font-medium p-1 rounded uppercase transition-colors hover:bg-gray-700"
          >
            Sign In
          </button>
        </form>

        <button
          onClick={continueWithGoogle}
          className="text-gray-100 bg-gray-800 font-medium p-3 rounded uppercase transition-colors hover:bg-gray-700"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default SignIn;
