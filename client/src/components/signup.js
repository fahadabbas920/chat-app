import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import joi from "joi";

const SignUp = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`http://192.168.18.189/signup`, user)
      .then((data) => setResponse(data.data))
      .catch((error) => setResponse(error.response.data));
    setUser({
      email: "",
      password: "",
    });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Sign Up</h1>
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
          }}
          autoComplete="off"
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
          autoComplete="off"
        />
        <br />
        <button type="subimt">Submit</button>
        <br />
        <div>{response.message}</div>
        <br />
        <Link to={"/chatapp"}>Chat App</Link>
        &nbsp;&nbsp;&nbsp;
        <Link to={"/"}>Login</Link>
      </form>
    </div>
  );
};

export default SignUp;
