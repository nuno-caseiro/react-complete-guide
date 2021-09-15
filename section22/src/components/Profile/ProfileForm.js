import classes from "./ProfileForm.module.css";
import { useContext, useRef } from "react";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router";

const ProfileForm = () => {
  const authCtx = useContext(AuthContext);
  const newPasswordInputRef = useRef();
  const history = useHistory()
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB_KLKuxvv3xMGjeDcbQDKt0XZevXBUsk0",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: true,
        }),
        headers: {'Content-Type': "application/json"}
      }
    ).then(res=>{
      history.push('/')
    });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password" ref={newPasswordInputRef}>
          New Password
        </label>
        <input type="password" id="new-password" minLength="7" ref={newPasswordInputRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
