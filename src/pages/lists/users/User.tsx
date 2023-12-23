import "./user.scss";
//import { Link } from "react-router-dom";
//import { users } from "../../../data";
import { Button } from "antd";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverTwoToneIcon from "@mui/icons-material/Delete";
//import { width } from "@mui/system";
import { useEffect, useState } from "react";
import axios from "axios";

const User = () => {
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/hassan-hardware/users/"
      );
      console.log(response.data);
      setFetchedUsers(response.data);
      setLoading(false);
    } catch (error) {
      setFetchedUsers([]);
      setLoading(false);
    }
  };
  const handleRemoveUserSubmit = async (
    event: React.FormEvent,
    userId: number
  ) => {
    event.preventDefault();
    const userFormData = new FormData();

    userFormData.append(
      "User",
      JSON.stringify({
        userId,
      })
    );

    console.log("API response: ", userFormData);
    setLoading(true);

    axios
      .post(
        "http://localhost:8080/hassan-hardware/users/remove",
        userFormData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        console.log("API response:", response.data);
        setFetchedUsers(response.data.users);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error occurred while making the API call:", error);
        setLoading(false);
      });
  };
  const handleChangeUserRoleSubmit = async (
    event: React.FormEvent,
    userId: number
  ) => {
    event.preventDefault();
    const userFormData = new FormData();

    userFormData.append(
      "User",
      JSON.stringify({
        userId,
      })
    );

    console.log("API response: ", userFormData);
    setLoading(true);

    axios
      .post(
        "http://localhost:8080/hassan-hardware/users/changeRole",
        userFormData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        console.log("API response:", response.data);
        setFetchedUsers(response.data.users);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error occurred while making the API call:", error);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  if (loading) return <div>Loading...</div>;

  return (
    <div className="users">
      <div
        className="addUser"
        style={{
          fontSize: "12px",
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        <a className="btn btn-primary btn-sm" href="/users/add/" role="button">
          <AddIcon />
          Add User
        </a>
      </div>
      <table
        className="table table-hover user table-dark table-sm"
        style={{
          marginLeft: "5px",
          marginRight: "5px",
          width: "1000px",
          justifyContent: "center",
          justifySelf: "center",
        }}
      >
        <thead>
          <tr className="tableHeading">
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Username</th>
            <th scope="col">Password</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody className="table-group-divider tableItem table-light">
          {fetchedUsers.map((user, index) => (
            <tr key={index} className="rowItem">
              <td>{user.userId}</td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.password}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.role}</td>
              <td>
                <Button
                  className="btn btn-danger"
                  style={{
                    marginTop: "0px",
                    fontSize: "14px",
                    alignItems: "center",
                    alignSelf: "center",
                  }}
                  onClick={(e) => handleRemoveUserSubmit(e, user.userId)}
                >
                  <DeleteForeverTwoToneIcon />
                </Button>{" "}
                {user.role === "Admin" ? (
                  <Button
                    className="btn btn-warning"
                    style={{
                      marginTop: "0px",
                      fontSize: "14px",
                      alignItems: "center",
                      alignSelf: "center",
                    }}
                    onClick={(e) => handleChangeUserRoleSubmit(e, user.userId)}
                  >
                    Remove Admin
                  </Button>
                ) : (
                  <Button
                    className="btn btn-success"
                    style={{
                      marginTop: "0px",
                      fontSize: "14px",
                      alignItems: "center",
                      alignSelf: "center",
                    }}
                    onClick={(e) => handleChangeUserRoleSubmit(e, user.userId)}
                  >
                    Make Admin
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;
