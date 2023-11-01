import { Link } from "react-router-dom";

const Home = () => {
  // localStorage.removeItem("token");
  const style = {
    height: "100vh",
    
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <div style={style}>
      <Link to={"/login"}>Login</Link>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Link to={"/signup"}>Sign up</Link>
    </div>
  );

};

export default Home;
