import {
  Chat,
  DonutLarge,
  MoreVert,
  SearchOutlined,
} from "@mui/icons-material";
import db from '../firebase';
import { Avatar, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import "./Sidebar.css";
import SidebarChat from "./SidebarChat/SidebarChat";
import { useStateValue } from "../context/StateProvider";

const Sidebar = () => {
  const [rooms, setRooms] = useState([]);
  const [{user},dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe = db.collection('rooms').onSnapshot(snapshot => (
      setRooms(snapshot.docs.map(doc => 
        ({id: doc.id,
          data: doc.data()
        })
        ))
    ));

    return () => {
      unsubscribe();
    };
  }, [])

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user && user.photoURL} alt={user && user.displayName}/>
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__container">
          <SearchOutlined />
          <form>
            <input className="sidebar__input" type="text" placeholder="Find someone..."/>
          </form>
        </div>
      </div>
      <div className="sidebar__chats">
        <SidebarChat addNewChat/>
        {rooms.map(room => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} img={room.data.img}/>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
