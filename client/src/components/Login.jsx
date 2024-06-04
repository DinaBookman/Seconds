import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
function Login() {
  function hash(string) {

    return createHash('sha256').update(string).digest('hex');
  
  }

    const navigate = useNavigate();
    const { setCurrentUser } = useContext(UserContext);
    function loginFunc(event) {
        event.preventDefault();
        const name=event.target[0].value;
        const nameAndPwd={
          "userName":name,
          "password":event.target[1].value
        }
        const params = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(nameAndPwd)
      };
     
        fetch(`http://localhost:8080/login/check`,params)
            .then(response => response.json())
            .then(response => response.length === 0 ? alert("No such user. Please register") : successLogin(response,name))
            .catch(error => console.error("Error during login:", error));
    }
    
    function successLogin(user,name) {
      
        fetch(`http://localhost:8080/users/?userName=${name}`)
            .then(response => response.json())
            .then(res=>{console.log(...res);
              console.log("user's login was successful")
              localStorage.setItem("currentUser",JSON.stringify(...res));
              setCurrentUser(...res)
              navigate(`/users/${[...res][0].id}/home`)

            })
    }

    return (<>
        <form onSubmit={loginFunc}>
            <p>UserName</p>
            <input placeholder="Enter UserName..." required></input><br />
            <p >Password</p>
            <input type="password" placeholder="Enter Pasword..." required></input><br /><div />
            <button type="submit">Login</button>
        </form>
        <h3>To register click </h3>
        <Link to={"/register"}> Here</Link>
    </>)
} export default Login