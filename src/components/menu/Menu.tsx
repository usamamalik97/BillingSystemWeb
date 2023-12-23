import { Link } from "react-router-dom";
import { menu } from "../../data";

import "./menu.scss";
const Menu = () => {
  return (
    <div className="menu">
      {menu.map((menuItem) => (
        <div className="item" key={menuItem.id}>
          <span className="title">{menuItem.title}</span>
          {menuItem.listItems.map((subMenu) => (
            <Link to={subMenu.url} className="listItem">
              {subMenu.icon}
              {subMenu.title}
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Menu;
