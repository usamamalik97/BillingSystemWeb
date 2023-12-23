import HomeIcon from "@mui/icons-material/Home";
import ShopIcon from "@mui/icons-material/Shop";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PersonIcon from "@mui/icons-material/Person";
import AlbumIcon from "@mui/icons-material/Album";

export const SidebarData = [
  { title: "Home", icon: <HomeIcon />, link: "/home" },
  { title: "Bills", icon: <ReceiptIcon />, link: "/bills" },
  { title: "Customers", icon: <PersonIcon />, link: "/customers" },
  { title: "Items", icon: <AlbumIcon />, link: "/items" },
  { title: "Shops", icon: <ShopIcon />, link: "/shops" },
];
