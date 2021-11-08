import { Avatar, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoodIcon from "@mui/icons-material/Mood";

import { useState, useEffect } from "react";
import { useParams } from "react-router";

import db from "../../firebase";
import { useStateValue } from "../../context/StateProvider";
import firebase from "@firebase/app-compat";

import "./Chat.css";

const Chat = () => {
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [{user},dispatch] = useStateValue();

  //for pulling right chat
  const [room, setRoom] = useState({});
  //store msg from firebase
  const [msgs, setMsgs] = useState([]);

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoom(snapshot.data()));
      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMsgs(snapshot.docs.map((doc) => doc.data()))
        );
    }
    console.log(user)
  }, [roomId]);

  const submitHandler = (e) => {
    e.preventDefault();
    db.collection('rooms').doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      uid: user.uid
    });
    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={room.img} alt={`Room: ${room.name}`}/>
        <div className="chat__headerInfo">
          <h3>{room.name}</h3>
          <p>{msgs.length > 0 && `Last seen ${new Date(msgs[msgs.length -1]?.timestamp?.toDate()).toUTCString().slice(4,22)}`}</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {msgs.map(msg => (
          <div className={`chat__message ${msg.name !== user.displayName ? "chat__messageRadius" : "chat__receiver chat__receiverRadius" }`}>
            <span className="chat__messageSender">{msg.name}</span>
            {msg.message}
            <span className="chat__messageTimestamp">{new Date(msg.timestamp?.toDate()).toUTCString().slice(17,22) }</span>
          </div>
        ))}
      </div>
      <div className="chat__footer">
        <div className="chat__footerIcons">
          <IconButton>
            <MoodIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon className="chat__attachIcon" />
          </IconButton>
        </div>
        <div className="chat__inputContainer">
          <form onSubmit={submitHandler}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="chat__input"
              type="text"
              placeholder="Type message"
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
