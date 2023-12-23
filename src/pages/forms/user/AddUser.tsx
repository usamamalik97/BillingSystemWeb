import { useState } from "react";
import "./addUser.scss";
import { Button } from "antd";
import axios from "axios";

const AddUser = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [validUsername, setValidUsername] = useState(false);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (checking || !validUsername) return;
    const userFormData = new FormData();

    userFormData.append(
      "User",
      JSON.stringify({
        name,
        username,
        password,
        phoneNumber,
        role,
      })
    );

    console.log("API response: ", userFormData);
    setLoading(true);
    axios
      .post("http://localhost:8080/hassan-hardware/users/add", userFormData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        console.log("API response:", response.data);
        window.location.href = "/users/";
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error occurred while making the API call:", error);
      });
  };
  const checkUsername = async (event: React.FormEvent) => {
    event.preventDefault();
    const userFormData = new FormData();

    userFormData.append(
      "User",
      JSON.stringify({
        name,
        username,
        password,
        phoneNumber,
        role,
      })
    );

    console.log("API response: ", userFormData);
    setChecking(true);
    setValidUsername(true);
    axios
      .post(
        `http://localhost:8080/hassan-hardware/check-username/${username}/`,
        userFormData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        console.log("API response:", response.data);
        setValidUsername(response.data === "false" ? true : false);
        setChecking(false);
      })
      .catch((error) => {
        console.error("Error occurred while making the API call:", error);
        setChecking(false);
      });
  };
  if (loading) return <div>Loading....</div>;
  return (
    <div className="addUser">
      <div className="box"></div>
      <form onSubmit={handleSubmit}>
        <div className="box box1">
          <div className="title">
            <b>New User</b>
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
                aria-describedby="basic-addon3 basic-addon4"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <span style={{ color: "red" }}>
              {!checking && !validUsername ? "Username already taken" : ""}
            </span>
          </div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter Username"
                aria-label="Name"
                aria-describedby="basic-addon3 basic-addon4"
                onChange={(e) => {
                  setUsername(e.target.value);
                  checkUsername(e);
                }}
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
                type="text"
                className="form-control"
                id="password"
                placeholder="Enter Password"
                aria-label="Password"
                aria-describedby="basic-addon3 basic-addon4"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="number" className="form-label">
              Phone Number
            </label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="number"
                placeholder="Enter Phone Number"
                aria-label="Number"
                aria-describedby="basic-addon3 basic-addon4"
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="role" className="form-label">
              Role
            </label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="role"
                placeholder="Enter Role"
                aria-label="Role"
                aria-describedby="basic-addon3 basic-addon4"
                onChange={(e) => setRole(e.target.value)}
                required
              />
            </div>
          </div>
          <Button
            className="btn btn-primary"
            type="primary"
            value="Submit"
            htmlType="submit"
          >
            Confirm
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
