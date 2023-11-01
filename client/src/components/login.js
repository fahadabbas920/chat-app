import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    await axios
      .post(`http://192.168.18.189/login`, user)
      .then((data) => {
        setResponse(data.data);
        localStorage.setItem("token", `Bearer ${data.data.token}`);
        setUser({
          email: "",
          password: "",
        });
        navigate(`/chatapp`, { state: { email: user.email } });
      })
      .catch((error) => {
        setResponse(error.response.data);
        setUser({
          email: "",
          password: "",
        });
      });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={user.email}
          placeholder="Enter username"
          onChange={(e) => {
            setUser((state) => {
              return {
                ...state,
                email: e.target.value,
              };
            });
            // setResponse("");
          }}
          autoComplete="false"
        />
        <br />
        <input
          type="password"
          value={user.password}
          placeholder="Enter password"
          onChange={(e) => {
            setUser((state) => {
              return {
                ...state,
                password: e.target.value,
              };
            });
          }}
          autoComplete="false"
        />
        <br />
        <button type="subimt">Submit</button>
      </form>
      {user.email}
      <br />
      {user.password}
      <br />
      <div style={{ color: "green" }}>{response.message}</div>
      <br />
      <Link to={"/chatapp"}>Chat App</Link>
      &nbsp;&nbsp;&nbsp;
      <Link to={"/signup"}>Sign up</Link>
    </div>
  );
};

export default Login;
