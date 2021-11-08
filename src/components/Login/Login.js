import "./Login.css";
import { Button } from "@mui/material";

import { auth, provider } from "../../firebase";
import { useStateValue } from "../../context/StateProvider";
import { actionTypes } from "../../context/actionTypes";

const Login = () => {
  const [{}, dispatch] = useStateValue();
  
  const signInHandler = () => {
    auth
      .signInWithPopup(provider)
      .then((result) =>
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        })
      )
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/2042px-WhatsApp.svg.png"
          alt="login_img"
        />
        <div className="login__text">
          <h1>Sign in WhatsAppClone</h1>
        </div>
        <Button onClick={signInHandler}>Sign with Google</Button>
      </div>
    </div>
  );
};

export default Login;
