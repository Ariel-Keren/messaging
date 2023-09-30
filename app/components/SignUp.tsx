import { auth, database } from "@/firebaseConfig";
import { IFriend, IRequest } from "@/types";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ChangeEvent, useState } from "react";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const changeUsername = (event: ChangeEvent<HTMLInputElement>) =>
    setUsername(event.target.value);

  const changeEmail = (event: ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);

  const changePassword = (event: ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  const signUp = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch {
      alert("Failed to sign in");
      return;
    }

    if (!auth.currentUser) {
      alert("Failed to sign in");
      return;
    }

    try {
      await updateProfile(auth.currentUser, { displayName: username });
    } catch {
      alert("Failed to set the username");
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
          Create an Account
        </h2>

        <form className="flex flex-col gap-2">
          <div className="flex flex-col">
            <label htmlFor="username" className="text-gray-100">
              Username
            </label>
            <input
              id="username"
              value={username}
              onChange={changeUsername}
              className="p-1 rounded-sm"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="sign-up-email" className="text-gray-100">
              Email
            </label>
            <input
              id="sign-up-email"
              value={email}
              onChange={changeEmail}
              className="p-1 rounded-sm"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="sign-up-password" className="text-gray-100">
              Password
            </label>
            <input
              type="password"
              id="sign-up-password"
              value={password}
              onChange={changePassword}
              className="p-1 rounded-sm"
            />
          </div>

          <button
            onClick={signUp}
            className="text-gray-100 bg-gray-800 font-medium p-1 rounded uppercase transition-colors hover:bg-gray-700"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
