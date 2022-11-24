import React, { useEffect } from "react";
import "./sidebar.css";
import logo from "../../assets/images/logo-sneaker.png";
// import sidebar_items from "../../assets/JsonData/sidebar_routes.json";
import { Link } from "react-router-dom";

const sidebar_items_1 = [
  {
      "display_name": "Dashboard",
      "route": "/",
      "icon": "bx bx-category-alt"
  },
  {
      "display_name": "Tài khoản",
      "route": "/accounts",
      "add": "/add-account",
      "modify": "/account-detail",
      "icon": "bx bx-user-pin"
  },
  {
      "display_name": "Sản phẩm",
      "route": "/products",
      "add": "/add-product",
      "modify": "/product-detail",
      "icon": "bx bx-package"
  },
  {
      "display_name": "Đơn hàng",
      "route": "/orders",
      "add": "/add-order",
      "modify": "/order-detail",
      "sub": "/detail-order",
      "icon": "bx bx-cart"
  },
  {
      "display_name": "Voucher",
      "route": "/vouchers",
      "add": "/add-voucher",
      "modify": "/voucher-detail",
      "icon": "bx bx-bar-chart-alt"
  },
  {
      "display_name": "Loại sản phẩm",
      "route": "/categories",
      "add": "/add-category",
      "modify": "/category-detail",
      "icon": "bx bx-list-ol"
  },
  {
      "display_name": "Khuyến mãi",
      "route": "/sale",
      "add": "/add-sale",
      "modify": "/sale-detail",
      "icon": "bx bx-gift"
  },
  {
      "display_name": "Thương hiệu",
      "route": "/brand",
      "add": "/add-brand",
      "modify": "/brand-detail",
      "icon": "bx bx-store-alt"
  },
  {
      "display_name": "Hộp thoại",
      "route": "/chat",
      "add": "/chat",
      "modify": "/chat",
      "icon": "bx bx-user-pin"
  }
]

const sidebar_items_2 = [
  {
      "display_name": "Đơn hàng",
      "route": "/orders",
      "add": "/add-order",
      "modify": "/order-detail",
      "sub": "/detail-order",
      "icon": "bx bx-cart"
  },
  {
      "display_name": "Hộp thoại",
      "route": "/chat",
      "add": "/chat",
      "modify": "/chat",
      "icon": "bx bx-user-pin"
  }
]
const SidebarItem = (props) => {
  const active = props.active ? "active" : "";

  return (
    <div className="sidebar__item">
      <div className={`sidebar__item-inner ${active}`}>
        <i className={props.icon}></i>
        <span>{props.title}</span>
      </div>
    </div>
  );
};

const Sidebar = (props) => {
  const sidebar_items = props.user.roleName === "ADMIN" ? sidebar_items_1 : sidebar_items_2;
  useEffect(() =>{
    console.log(props.user);
  }, [])
  const activeItem = sidebar_items.findIndex(
    (item) => item.route === props.location.pathname || item.add === props.location.pathname || item.modify === props.location.pathname.substring(0, props.location.pathname.lastIndexOf("/") || item.sub === props.location.pathname.substring(0, props.location.pathname.lastIndexOf("/")))
  );

  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <img src={logo} alt="store logo" />
      </div>
      {sidebar_items.map((item, index) => (
        <Link to={item.route} key={index}>
          <SidebarItem
            title={item.display_name}
            icon={item.icon}
            active={index === activeItem}
          ></SidebarItem>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
