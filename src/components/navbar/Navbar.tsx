import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import GridViewIcon from "@mui/icons-material/GridView";
import Settings from "@mui/icons-material/Settings";

import "./navbar.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <img src="favicon.ico" alt="" />
        <span>Hassan Hardware</span>
      </div>
      <div className="icons">
        <SearchIcon />
        <NotificationsIcon />
        <GridViewIcon />
        <div className="user">
          <PersonIcon />
          <span>Usama</span>
        </div>
        <Settings />
      </div>
    </div>
  );
};

export default Navbar;
