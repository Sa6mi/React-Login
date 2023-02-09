import { useEffect, useState } from "react";
import Card from "../../Components/Card/Card";
import {getAllUsers} from "../../Utils/UserFunctions";
import "./Users.css";
import { useNavigate } from "react-router-dom";

function Users() {
  const [Users, setUsers] = useState<any[]>([]);
  const Navigate = useNavigate();
  useEffect(() => {
    getAllUsers().then((res) => {
      setUsers(res.users);
    });
  });
  return (
    <Card>
      <div className="Container">
        <div>Users</div>
        <Card className="UserList">
          <ul>
            {Users.map((user) => {
              return (
                <li
                  key={user.id}
                  onClick={() => {
                    Navigate("/Login", { state: { user: user.username } });
                  }}
                >
                  {user.username}
                </li>
              );
            })}
          </ul>
        </Card>
      </div>
    </Card>
  );
}

export default Users;
