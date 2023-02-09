import { useNavigate, useLocation } from "react-router-dom";
import "./Menu.css";
import { useState } from "react";
import Icons from "./Icons/Icons";
import { deleteSavedUser } from "../../Utils/UserFunctions";
function Menu(props:any) {
  const Navigate = useNavigate();
  const Location = useLocation();
  const [menu, setMenu] = useState(true);
  const changeMenu = () => {
    menu === true ? setMenu(false) : setMenu(true);
  };
  return (
    <div>
      <div className="Menu" id={menu === true ? "" : "disableMenu"}>
        <div className="Header">
          <div onClick={changeMenu}>
            <Icons.MenuIcon className="Menu-Icon"></Icons.MenuIcon>
          </div>
        </div>
        <div
          className="MenuItem"
          id={Location.pathname === "/Dashboard" ? "Active" : ""}
          onClick={() => Navigate("/Dashboard")}
        >
          <Icons.DashboardIcon className="Icon"></Icons.DashboardIcon>
          Dashboard
        </div>
        <div
          className="MenuItem"
          id={Location.pathname === "/Posts" ? "Active" : ""}
          onClick={() => Navigate("/Posts")}
        >
          <Icons.DynamicFeedIcon className="Icon"></Icons.DynamicFeedIcon>
          Posts
        </div>
        <div
          className="Logout"
          onClick={() => {
            deleteSavedUser();
            props.Logout(false);
          }}
        >
          <Icons.LogoutIcon className="Icon"> </Icons.LogoutIcon>
          Logout
        </div>
      </div>
      )
    </div>
  );
}

export default Menu;
