import React from "react";
import "../../CSS/App.css";
import { SidebarData } from "./SidebarData";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <>
      <div className="Sidebar">
        <div className="title">Hassan Hardware</div>
        <ul className="SidebarList">
          {SidebarData.map((val, index) => {
            return (
              <li
                key={index}
                id={window.location.pathname == val.link ? "active" : ""}
                onClick={() => (window.location.pathname = val.link)}
                className="row"
              >
                <div id="icon">{val.icon}</div>
                <div id="title">
                  {val.title}
                  {/*<Link to={val.link}></Link>*/}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      Hi
    </>
  );
};

export default Sidebar;
