import "./user.scss";
import { Link } from "react-router-dom";
interface ProductsInterface {
  users: any[];
}

const User = ({ users }: ProductsInterface) => {
  console.log(users);
  return (
    <div className="usersDiv">
      <Link to="/users/" style={{ color: "darkslategrey" }}>
        <h5>Users</h5>
      </Link>
      <div className="list">
        <table className="table table-hover userDiv table-info table-sm">
          <thead>
            <tr className="tableHeading">
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Role</th>
            </tr>
          </thead>
          <tbody className="table-group-divider tableItem table-info">
            {users.map((user) => (
              <tr key={user.userId} className="rowItem">
                <td>{user.userId}</td>
                <td>{user.name}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
