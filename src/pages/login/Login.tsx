import { Button } from "antd";
import "./login.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

// Login.tsx
import { login } from "../../app/authSlice";

const Login = () => {
  //const { authState, setAuthState } = useAuth();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const [authenticationFailed, setAuthenticationFailed] = useState(false);
  const formData = new URLSearchParams();

  useEffect(() => {
    const element = document.getElementById("name");

    element?.focus();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Authenticated");
    formData.append("User", JSON.stringify({ username: user, password: pwd }));
    console.log(formData);
    try {
      /*const response1 = await axios.post(
        "http://localhost:8080/login",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      console.log("Response1");
      console.log(response1);*/
      const response = await axios.post(
        "http://localhost:8080/hassan-hardware/authenticate",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      console.log("Response");
      console.log(response);

      /*const response = await axios.post(
        "http://localhost:8080/hassan-hardware/login",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );*/
      //      dispatch(login({ username: "wahaj01", role: "Employee" }));
      dispatch(login(response.data));
      //dispatch(login({ username: "arshad01", role: "Admin" }));
      //      dispatch(login(response?.data?.user));
      setUser("");
      setPwd("");
      setSuccess(true);
    } catch (err) {
      console.log(err);
      setAuthenticationFailed(true);
      //dispatch(login({ user, accessToken: null }));
      /*setAuthState({
        isAuthenticated: true,
        user,
        roles: null,
        accessToken: null,
      });
      localStorage.setItem("authState", JSON.stringify(authState));*/

      /*      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.this.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.this.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }*/
    }
    console.log("Successfully Authenticated");
  };
  console.log("Successfully Authenticated");

  return (
    <div className="login">
      <div className="box"></div>
      <div className="box"></div>
      <form onSubmit={handleSubmit}>
        <div className="box box1">
          <div className="title">
            <b>Sign In</b>
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter Name"
                aria-label="Name"
                value={user}
                onChange={(e) => {
                  setUser(e.target.value);
                  setAuthenticationFailed(false);
                }}
                aria-describedby="basic-addon3 basic-addon4"
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-group">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter Password"
                aria-label="Password"
                value={pwd}
                onChange={(e) => {
                  setPwd(e.target.value);
                  setAuthenticationFailed(false);
                }}
                aria-describedby="basic-addon3 basic-addon4"
                required
              />
            </div>
            {authenticationFailed ? (
              <span style={{ fontSize: "12px", color: "red" }}>
                Incorrect Username or Password
              </span>
            ) : (
              <></>
            )}
          </div>

          <Button
            className="btn btn-primary"
            type="primary"
            value="Submit"
            htmlType="submit"
          >
            Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
