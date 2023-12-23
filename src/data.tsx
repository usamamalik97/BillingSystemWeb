import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import StoreIcon from "@mui/icons-material/Store";
import ReceiptIcon from "@mui/icons-material/Receipt";
import InventoryIcon from "@mui/icons-material/Inventory";
import GroupsIcon from "@mui/icons-material/Groups";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PaidIcon from "@mui/icons-material/Paid";
import PaymentsIcon from "@mui/icons-material/Payments";
import ArticleIcon from "@mui/icons-material/Article";
import PaymentIcon from "@mui/icons-material/Payment";
import MoneyIcon from "@mui/icons-material/Money";
import AddIcon from "@mui/icons-material/Add";
export const menu = [
  {
    id: 1,
    title: "Main",
    listItems: [
      {
        id: 1,
        title: "Home",
        url: "/home",
        icon: <HomeIcon />,
      },
      {
        id: 2,
        title: "Users",
        url: "/users",
        icon: <PersonIcon />,
      },
    ],
  },
  {
    id: 2,
    title: "Lists",
    listItems: [
      {
        id: 1,
        title: "Products",
        url: "/products",
        icon: <InventoryIcon />,
      },
      {
        id: 2,
        title: "Bills",
        url: "/bills",
        icon: <ReceiptIcon />,
      },
      {
        id: 3,
        title: "Shops",
        url: "/shops",
        icon: <StoreIcon />,
      },
      {
        id: 4,
        title: "Customers",
        url: "/customers",
        icon: <GroupsIcon />,
      },
    ],
  },
  {
    id: 3,
    title: "User",
    listItems: [
      {
        id: 2,
        title: "Sign Out",
        url: "/signout",
        icon: <ExitToAppIcon />,
      },
    ],
  },
];

export const adminMenu = [
  {
    id: 1,
    title: "Home",
    url: "/home",
    icon: <HomeIcon />,
  },
  {
    id: 2,
    title: "Products",
    url: "/products",
    icon: <InventoryIcon />,
  },
  {
    id: 3,
    title: "Bills",
    url: "/bills",
    icon: <ReceiptIcon />,
  },
  {
    id: 4,
    title: "Customers",
    url: "/customers",
    icon: <GroupsIcon />,
  },

  {
    id: 5,
    title: "More",
    url: "/signout",
    icon: <ExitToAppIcon />,
    listItems: [
      {
        id: 1,
        title: "Users",
        url: "/users",
        icon: <PersonIcon />,
      },
      {
        id: 2,
        title: "Reports",
        url: "/reports",
        icon: <ArticleIcon />,
      },
      {
        id: 3,
        title: "Cheques",
        url: "/cheques",
        icon: <PaymentsIcon />,
      },
      {
        id: 4,
        title: "Transactions",
        url: "/transactions",
        icon: <PaymentIcon />,
      },
      {
        id: 5,
        title: "Cash Amounts",
        url: "/payments",
        icon: <MoneyIcon />,
      },
      {
        id: 6,
        title: "Expenses",
        url: "/expenses",
        icon: <PaidIcon />,
      },

      {
        id: 7,
        title: "Shops",
        url: "/shops",
        icon: <StoreIcon />,
      },
      {
        id: 8,
        title: "Signout",
        url: "/signout",
        icon: <ExitToAppIcon />,
      },
    ],
  },
];

export const employeeMenu = [
  {
    id: 1,
    title: "New Bill",
    url: "/bill/add/",
    icon: <AddIcon />,
  },
  {
    id: 3,
    title: "Products",
    url: "/products",
    icon: <InventoryIcon />,
  },
  {
    id: 4,
    title: "Bills",
    url: "/bills",
    icon: <ReceiptIcon />,
  },
  {
    id: 6,
    title: "Customers",
    url: "/customers",
    icon: <GroupsIcon />,
  },
  {
    id: 7,
    title: "Signout",
    url: "/signout",
    icon: <ExitToAppIcon />,
  },
];
export const bills = [
  {
    billId: 1,
    customer: { customerName: "Usama Ikram", shopName: "Ikram Bearings" },
    shop: { shopName: "Ikram Bearings" },
    dueAmount: 1000,
    totalAmount: 10000,
    paidAmount: 9000,
    billStatus: {
      status: "P",
    },
    status: "P",
  },
  {
    billId: 2,
    customer: { customerName: "Talha Ikram", shopName: "Ikram Bearings" },
    shop: { shopName: "Ikram Bearings" },
    dueAmount: 100000,
    totalAmount: 100000,
    paidAmount: 0,
    billStatus: {
      status: "N",
    },
    status: "N",
  },
  {
    billId: 3,
    customer: { customerName: "Saad Arshad", shopName: "Hassan Hardware" },
    shop: { shopName: "Hassan Hardware" },
    dueAmount: 10100,
    totalAmount: 10100,
    paidAmount: 10100,
    billStatus: {
      status: "F",
    },
    status: "F",
  },
];

export const bill = {
  billId: 1,
  billDate: "2023-08-22",
  customerName: "Naeem Maher",
  items: [
    {
      itemId: 1,
      size: "T45A31",
      material: "METAL",
      quantity: 100,
      price: 110.01,
    },
    {
      itemId: 2,
      size: "T45A32",
      material: "METAL",
      quantity: 100,
      price: 110.01,
    },
    {
      itemId: 3,
      size: "T45A33",
      material: "METAL",
      quantity: 100,
      price: 110.01,
    },
    {
      itemId: 4,
      size: "T45A34",
      material: "METAL",
      quantity: 100,
      price: 110.01,
    },
    {
      itemId: 5,
      size: "T45A35",
      material: "METAL",
      quantity: 100,
      price: 110.01,
    },
  ],
  totalAmount: 190000,
  paidAmount: 100000,
};
export const products = [
  {
    itemId: 1,
    itemSize: "T45A31",
    itemMaterial: "METAL",
    itemWeight: 0.001231,
    quantity: 1000,
  },
  {
    itemId: 2,
    itemSize: "T45A32",
    itemMaterial: "IRON",
    itemWeight: 1231,
    quantity: 10001,
  },
  {
    itemId: 3,
    itemSize: "T45A313",
    itemMaterial: "SOFT",
    itemWeight: 1.231,
    quantity: 989,
  },
  {
    itemId: 5,
    itemSize: "T45A311",
    itemMaterial: "NONE",
    itemWeight: 0.1231,
    quantity: 9900,
  },
  {
    itemId: 6,
    itemSize: "T45A311",
    itemMaterial: "NONE",
    itemWeight: 0.1231,
    quantity: 9900,
  },
];

export const productDetail = {
  itemId: 1,
  size: "T45A31",
  itemMaterial: "METAL",
  itemWeight: 0.001231,
  quantity: 1000,
  itemRecordList: [
    {
      itemId: 1,
      quantity: 1000,
      costPrice: 10,
      quantitySold: 100,
      quantityRemaining: 900,
      purchaseDate: "2023-08-20",
    },
    {
      itemId: 2,
      quantity: 1000,
      costPrice: 10,
      quantitySold: 100,
      quantityRemaining: 900,
      purchaseDate: "2023-08-11",
    },
    {
      itemId: 3,
      quantity: 1000,
      costPrice: 10,
      quantitySold: 100,
      quantityRemaining: 900,
      purchaseDate: "2023-08-28",
    },
    {
      itemId: 5,
      quantity: 1000,
      costPrice: 10,
      quantitySold: 100,
      quantityRemaining: 900,
      purchaseDate: "2023-08-21",
    },
    {
      itemId: 6,
      quantity: 1000,
      costPrice: 10,
      quantitySold: 100,
      quantityRemaining: 900,
      purchaseDate: "2023-08-22",
    },
    {
      itemId: 7,
      quantity: 1000,
      costPrice: 10,
      quantitySold: 100,
      quantityRemaining: 900,
      purchaseDate: "2023-08-23",
    },
    {
      itemId: 4,
      quantity: 1000,
      costPrice: 10,
      quantitySold: 100,
      quantityRemaining: 900,
      purchaseDate: "2023-08-24",
    },
  ],
};
export const customers = [
  {
    customerId: 1,
    customerName: "Talha Ikram",
    shopName: "Ikram Bearings",
    pendingBills: 9,
    pendingAmount: 10000,
    dueAmount: 1000,
  },
  {
    customerId: 2,
    customerName: "Talha Ikram",
    shopName: "Ikram Bearings",
    pendingBills: 96,
    pendingAmount: 1023000,
    dueAmount: 1000,
  },
  {
    customerId: 3,
    customerName: "Talha Ikram",
    shopName: "Ikram Bearings",
    pendingBills: 9123,
    pendingAmount: 10000141,
    dueAmount: 1000,
  },
  {
    customerId: 4,
    customerName: "Talha Ikram",
    shopName: "Ikram Bearings",
    pendingBills: 912,
    pendingAmount: 1000012,
    dueAmount: 1000,
  },
  {
    customerId: 5,
    customerName: "Talha Ikram",
    shopName: "Ikram Bearings",
    pendingBills: 90,
    pendingAmount: 100010,
    dueAmount: 1000,
  },
  {
    customerId: 6,
    customerName: "Talha Ikram",
    shopName: "Ikram Bearings",
    pendingBills: 19,
    pendingAmount: 100100,
    dueAmount: 1000,
  },
  /*{
    customerId: 7,
    customerName: "Talha Ikram",
    shopName: "Ikram Bearings",
    pendingBills: 91,
    pendingAmount: 10900,
  },*/
];
export const customersList = [
  {
    customerId: 1,
    customerName: "Talha Ikram",
    shopName: "Ikram Bearings",
    pendingBills: 9,
    pendingAmount: 10000,
    phoneNumber: "090078601",
  },
  {
    customerId: 2,
    customerName: "Talha Ikram",
    shopName: "Ikram Bearings",
    pendingBills: 96,
    pendingAmount: 1023000,
    phoneNumber: "090078602",
  },
  {
    customerId: 3,
    customerName: "Talha Ikram",
    shopName: "Ikram Bearings",
    pendingBills: 9123,
    pendingAmount: 10000141,
    phoneNumber: "090078603",
  },
  {
    customerId: 4,
    customerName: "Talha Ikram",
    shopName: "Ikram Bearings",
    pendingBills: 912,
    pendingAmount: 1000012,
    phoneNumber: "090078604",
  },
  {
    customerId: 5,
    customerName: "Wahaj Arshad",
    shopName: "Ikram Bearings",
    pendingBills: 90,
    pendingAmount: 100010,
    phoneNumber: "090078605",
  },
  {
    customerId: 6,
    customerName: "Saad Arshad",
    shopName: "Ikram Bearings",
    pendingBills: 19,
    pendingAmount: 100100,
    phoneNumber: "090078606",
  },
  {
    customerId: 7,
    customerName: "Usama Ikram",
    shopName: "Ikram Bearings",
    pendingBills: 91,
    pendingAmount: 10900,
    phoneNumber: "090078607",
  },
];
export const customer = {
  customerName: "Talha Ikram",
  shopName: "Ikram Bearings",
  phoneNumber: "090078601",
  emailId: "talhaikram@gmail.com",
  remainingBalance: 10000,
  bills: [
    {
      billId: 1,
      purchaseDate: "2023-08-23",
      totalAmount: 10050,
      paidAmount: 10050,
      remainingBalance: 0,
      billStatus: "F",
    },
    {
      billId: 2,
      purchaseDate: "2023-08-23",
      totalAmount: 10000,
      paidAmount: 0,
      remainingBalance: 10000,
      billStatus: "N",
    },
    {
      billId: 3,
      purchaseDate: "2023-08-23",
      totalAmount: 10050,
      paidAmount: 10000,
      remainingBalance: 50,
      billStatus: "P",
    },
    {
      billId: 4,
      purchaseDate: "2023-08-23",
      totalAmount: 10050,
      paidAmount: 10050,
      remainingBalance: 0,
      billStatus: "F",
    },
    {
      billId: 5,
      purchaseDate: "2023-08-23",
      totalAmount: 10050,
      paidAmount: 10050,
      remainingBalance: 0,
      billStatus: "F",
    },
  ],
};
export const amounts = [
  {
    value: 10000,
    name: "Received",
  },

  {
    value: 90000,
    name: "Pending",
  },
];

export const billsCounts = [
  {
    value: 100,
    name: "Full",
  },

  {
    value: 50,
    name: "Pending",
  },
  {
    value: 90,
    name: "Partial",
  },
];
export const users = [
  {
    Id: 1,
    Name: "Arshad",
    Role: "Admin",
    Number: "03224298790",
    UserName: "arshad01",
    Password: "arshad01",
  },
  {
    Id: 2,
    Name: "Saad",
    Role: "Admin",
    Number: "03224298791",
    UserName: "saad01",
    Password: "saad01",
  },
  {
    Id: 3,
    Name: "Wahaj",
    Role: "Employee",
    Number: "03224298792",
    UserName: "wahaj01",
    Password: "wahaj01",
  },
  /*{
    Id: 4,
    Name: "Hafiz",
    Role: "Employee",
    Number: "03224298793",
  },
  {
    Id: 5,
    Name: "Salman",
    Role: "Employee",
    Number: "03224298794",
  },*/
];

export const shops = [
  {
    shopId: 1,
    address: "Talha Ikram",
    shopName: "Ikram Bearings",
    pendingBills: 9,
    pendingAmount: 10000,
    phoneNumber: "090123123",
    emailId: "usamaikram82@gmailcom",
  },
  {
    shopId: 2,
    address: "Talha Ikram",
    shopName: "Ikram Bearings",
    pendingBills: 96,
    pendingAmount: 1023000,
    phoneNumber: "090123123",
    emailId: "usamaikram82@gmailcom",
  },
  {
    shopId: 3,
    address: "Talha Ikram",
    shopName: "Ikram Bearings",
    pendingBills: 9123,
    pendingAmount: 10000141,
    phoneNumber: "090123123",
    emailId: "usamaikram82@gmailcom",
  },
  {
    shopId: 4,
    address: "Talha Ikram",
    shopName: "Ikram Bearings",
    pendingBills: 912,
    pendingAmount: 1000012,
    phoneNumber: "090123123",
    emailId: "usamaikram82@gmailcom",
  },
  {
    shopId: 5,
    address: "Talha Ikram",
    shopName: "Ikram Bearings",
    pendingBills: 90,
    pendingAmount: 100010,
    phoneNumber: "090123123",
    emailId: "usamaikram82@gmailcom",
  },
  {
    shopId: 6,
    address: "Talha Ikram",
    shopName: "Ikram Bearings",
    pendingBills: 19,
    pendingAmount: 100100,
    phoneNumber: "090123123",
    emailId: "usamaikram82@gmailcom",
  },
  {
    shopId: 7,
    address: "Talha Ikram",
    shopName: "Ikram Bearings",
    pendingBills: 91,
    pendingAmount: 10900,
    phoneNumber: "090123123",
    emailId: "usamaikram82@gmailcom",
  },
];
export const shop = {
  shopId: 1,
  address: "Branth Road",
  shopName: "Ikram Bearings",
  pendingBills: 9,
  remainingBalance: 10000,
  phoneNumber: "090123123",
  emailId: "usamaikram82@gmailcom",
  customers: [
    {
      customerName: "Talha ",
      customerId: 1,
      billCount: 5,
      pendingBillCount: 2,
      totalAmount: 10000,
      paidAmount: 1000,
      remainingAmount: 9000,
    },
    {
      customerName: "Talha ",
      customerId: 2,
      billCount: 5,
      pendingBillCount: 2,
      totalAmount: 10000,
      paidAmount: 1000,
      remainingAmount: 9000,
    },
    {
      customerName: "Talha ",
      customerId: 3,
      billCount: 5,
      pendingBillCount: 2,
      totalAmount: 10000,
      paidAmount: 1000,
      remainingAmount: 9000,
    },
    {
      customerName: "Talha ",
      customerId: 4,
      billCount: 5,
      pendingBillCount: 2,
      totalAmount: 10000,
      paidAmount: 1000,
      remainingAmount: 9000,
    },
  ],
};
