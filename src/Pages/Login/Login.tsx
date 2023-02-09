import { useState } from "react";
import Card from "../../Components/Card/Card";
import Button from "../../Styled Components/Buttons";
import "./Login.css";
import { authenticateUser, saveUser } from "../../Utils/UserFunctions";
import { useLocation, useNavigate } from "react-router-dom";
const Login = (props:any) => {
  const location = useLocation();
  const [user, setUser] = useState({ username:location.state.user, password: "" });
  const [error, setError] = useState(false);
  const Navigate = useNavigate();
  function SubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    authenticateUser(user).then((res) => {
      saveUser(res);
      props.Login(true);
      Navigate("/Dashboard");
    }).catch((err)=>{
      console.log("Error: ", err);
      setUser({...user,password:""});
      setError(true);
    });
  }
  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }
  function errorHandle () {
    if (error && user.password === "") {
      return <p style={{ color: "red" }}>Invalid Credintials</p>;
    }
    else if(error && user.password !== ""){
      setError(false);
    }
  }
  return (
    <Card className="Container2">
      <form className="Login-Form" onSubmit={SubmitHandler}>
        <div className="Login-Form-Item">
          <label>Username</label>
          <input
            type="text"
            name="username"
            onChange={onChangeHandler}
            value={user.username}
          />
        </div>
        <div className="Login-Form-Item">
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={onChangeHandler}
            value={user.password}
          />
        </div>
        <div className="Login-Form-Item">
          <Button type="submit" className="Submit">
            Login
          </Button>
        </div>
      </form>
      <p style={{ fontSize: "1rem" }}>User:atuny0 Pass:9uQFF1Lh</p>
      {errorHandle()}
    </Card>
  );
};

export default Login;
