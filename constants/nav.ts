import {
  IoSpeedometerOutline,
  IoListOutline,
  IoCardOutline,
  IoCartOutline,
  IoWalletOutline,
} from "react-icons/io5";

export const SidebarMenu = [
  {
    name: "Dashboard",
    icon: IoSpeedometerOutline,
    submenu: [],
    route: "/",
  },
  {
    name: "Product",
    icon: IoListOutline,
    submenu: [
      {
        name: "Facets",
        route: "/facets",
      },
      {
        name: "Products",
        route: "/products",
      },
      {
        name: "Add product",
        route: "/add-product",
      },
      {
        name: "Print Barcode",
        route: "/print-barcode",
      },
      {
        name: "Adjustment List",
        route: "/adjustment-list",
      },
      {
        name: "Add Adjustment",
        route: "/add-adjustment",
      },
      {
        name: "Stock Count",
        route: "/stock-count",
      },
    ],
    route: "",
  },
  {
    name: "Purchase",
    icon: IoCardOutline,
    submenu: [
      {
        name: "Purchase",
        route: "/purchase",
      },
      {
        name: "Add Purchase",
        route: "/add-purchase",
      },
      {
        name: "Import Purchase by CSV",
        route: "/import-purchase-csv",
      },
    ],
    route: "",
  },
  {
    name: "Sale",
    icon: IoCartOutline,
    submenu: [
      {
        name: "Sale List",
        route: "/sale-list",
      },
      {
        name: "Add Sale",
        route: "/add-sale",
      },
      {
        name: "Import Sale by CSV",
        route: "/import-sale-csv",
      },
      {
        name: "POS",
        route: "/pos",
      },
      {
        name: "Giftcard List",
        route: "/giftcard-list",
      },
      {
        name: "Coupon List",
        route: "/coupon-list",
      },
      {
        name: "Delivery List",
        route: "/delivery-list",
      },
    ],
    route: "",
  },
  {
    name: "Expense",
    icon: IoWalletOutline,
    submenu: [
      {
        name: "Expense Category",
        route: "/expense-category",
      },
      {
        name: "Expense List",
        route: "/expense-list",
      },
      {
        name: "Add Expense",
        route: "/add-expense",
      },
    ],
    route: "",
  },
];
