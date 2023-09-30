"use client";
import { auth, database } from "@/firebaseConfig";
import Authentication from "./components/Authentication";
import { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { IRequest, IFriend, IMessage } from "@/types";
import MessageBox from "./components/MessageBox";
import {
  DocumentData,
  DocumentSnapshot,
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

const Home: React.FC = () => {
  const [user, setUser] = useState<User | null | undefined>();
  const [requests, setRequests] = useState<IRequest[]>([]);
  const [friends, setFriends] = useState<IFriend[]>([]);
  const [currentFriendIndex, setCurrentFriendIndex] = useState<number | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser) return;

    const reference = doc(database, `users/${auth.currentUser.uid}`);
    const unsubscribe = onSnapshot(
      reference,
      (snapshot) => {
        const data = snapshot.data();

        if (!data) return alert("Failed to get the user's data");

        setFriends(data.friends);
        setRequests(data.requests);
        setIsLoading(false);
      },
      () => {
        alert("Failed to get the user's data");
      }
    );

    return unsubscribe;
  }, [user]);

  onAuthStateChanged(auth, (newUser) => {
    if (!isLoading) return;
    setUser(newUser);
  });

  const changeFriend = (id: string) =>
    setCurrentFriendIndex(
      friends?.findIndex((friend) => friend.id === id) ?? null
    );

  const closeFriend = () => setCurrentFriendIndex(null);

  const addMessage = async (text: string) => {
    if (!user || currentFriendIndex === null || !friends || !user.displayName)
      return;

    const newMessage: IMessage = {
      text,
      senderName: user.displayName,
      dateSent: Date.now(),
    };
    const newMessages = [...friends[currentFriendIndex].messages, newMessage];
    const newFriend = {
      ...friends[currentFriendIndex],
      messages: newMessages,
    };
    const newFriends = [...friends];
    newFriends[currentFriendIndex] = newFriend;

    const reference = doc(database, `users/${user.uid}`);

    try {
      await updateDoc(reference, { friends: newFriends });
    } catch {
      alert("Failed to send the message");
      return;
    }

    const friendReference = doc(
      database,
      `users/${friends[currentFriendIndex].id}`
    );
    let snapshot: DocumentSnapshot<DocumentData> | null = null;

    try {
      snapshot = await getDoc(friendReference);
    } catch {
      alert("Failed to send the message");
      return;
    }
    const data = snapshot.data();

    if (!data) return;

    const friendsOfFriend: IFriend[] = data.friends;

    const userFriend: IFriend = {
      name: user.displayName,
      id: user.uid,
      messages: newMessages,
    };
    const userFriendIndex = friendsOfFriend.findIndex(
      (friend) => friend.id === user.uid
    );
    const newFriendsOfFriend = [...friendsOfFriend];
    newFriendsOfFriend[userFriendIndex] = userFriend;

    try {
      await updateDoc(friendReference, { friends: newFriendsOfFriend });
    } catch {
      alert("Failed to send the message");
      return;
    }

    setFriends(newFriends);
  };

  const acceptRequest = async (id: string) => {
    if (!user) return;

    const newFriend: IFriend = {
      name: (requests?.find((request) => request.id === id) ?? { name: "" })
        .name,
      id,
      messages: [],
    };
    const newFriends: IFriend[] = [...(friends ?? []), newFriend];
    const newRequests: IRequest[] =
      requests?.filter((request) => request.id !== id) ?? [];

    const reference = doc(database, `users/${user.uid}`);

    try {
      await updateDoc(reference, {
        friends: newFriends,
        requests: newRequests,
      });
    } catch {
      alert("Failed to accept the request");
      return;
    }

    const friendReference = doc(database, `users/${id}`);

    try {
      await updateDoc(friendReference, {
        friends: arrayUnion({
          name: user.displayName,
          id: user.uid,
          messages: [],
        }),
      });
    } catch {
      alert("Failed to accept the request");
      return;
    }

    setFriends(newFriends);
    setRequests(newRequests);
  };

  const declineRequest = async (id: string) => {
    if (!user) return;

    const newRequests: IRequest[] =
      requests?.filter((request) => request.id !== id) ?? [];

    const reference = doc(database, `users/${user.uid}`);

    try {
      await updateDoc(reference, {
        requests: newRequests,
      });
    } catch {
      alert("Failed to decline the request");
    }
  };

  if (isLoading) return <p>LOADING</p>;

  if (!user) return <Authentication />;

  return (
    <>
      <Header
        currentFriend={
          currentFriendIndex === null ? null : friends[currentFriendIndex]
        }
        closeFriend={closeFriend}
      />
      <Sidebar
        friends={friends ?? []}
        onFriendClick={changeFriend}
        requests={requests ?? []}
        accept={acceptRequest}
        decline={declineRequest}
      />
      <MessageBox
        currentFriend={
          currentFriendIndex === null ? null : friends[currentFriendIndex]
        }
        addMessage={addMessage}
      />
    </>
  );
};

export default Home;
