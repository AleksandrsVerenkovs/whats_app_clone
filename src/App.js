import "./App.css";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat/Chat";
import Login from "./components/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Fragment } from "react";

import {useStateValue} from './context/StateProvider';

function App() {
  const [{user}, dispatch] = useStateValue();
  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__container">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Sidebar />}></Route>
              <Route
                path="/rooms/:roomId"
                element={
                  <Fragment>
                    <Sidebar />
                    <Chat />
                  </Fragment>
                }
              ></Route>
            </Routes>
          </BrowserRouter>
        </div>
      )}
    </div>
  );
}

export default App;
