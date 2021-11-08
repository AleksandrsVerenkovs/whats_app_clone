import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import "./SidebarChat.css";
import db from "../../firebase";
import { Link } from "react-router-dom";

const SidebarChat = ({ addNewChat, id, name, img }) => {
  const [messages, setMessages] = useState("");

  const createChatHandler = () => {
    const roomName = prompt("Please enter room name.");

    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
        img: `https://avatars.dicebear.com/api/human/${Math.floor(
          Math.random() * 4000
        )}.svg`,
      });
    }
  };

  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={img} alt={`Room: ${name}`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChatHandler} className="sidebarChat">
      <h2>Add new Chat</h2>
    </div>
  );
};

export default SidebarChat;
