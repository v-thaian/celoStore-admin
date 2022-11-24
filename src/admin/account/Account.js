import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  getAccounts,
  getTotalPage,
  getAccountByRole
} from "../../api/AccountApi";

import Badge from "../badge/Badge";

const roleName = {
  "EMP": "primary",
  "CUS": "success",
  "ADMIN": "danger",
};

const active = {
  true: "primary",
  false: "danger",
};
const Account = () => {
  const [account, setAccount] = useState();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const [role, setRole] = useState("TẤT CẢ");

  var rows = new Array(total).fill(0).map((zero, index) => (
    <li
      className={page === index + 1 ? "page-item active" : "page-item"}
      key={index}
    >
      <button
        className="page-link"
        style={{ borderRadius: 50 }}
        onClick={() => onChangePage(index + 1)}
      >
        {index + 1}
      </button>
    </li>
  ));

  const onChangePage = (page) => {
    setPage(page);
  };
  useEffect(() => {
    onLoad();
  }, [page]);

  const onLoad = () => {
    getAccounts(page, 9)
      .then((resp) => setAccount(resp.data))
      .catch((error) => console.log(error));

    getTotalPage()
      .then((resp) => setTotal(resp.data))
      .catch((error) => console.log(error));
  };

  const getAccountByRoleHandler = (value) => {
    setRole(value);
    if (value === "TẤT CẢ") {   
      setPage(1);
      onLoad();
    } else {
      setPage(1);
      getAccountByRole(1, 9, value)
        .then((resp) => setAccount(resp.data))
        .catch((error) => console.log(error));
    }
  };
  return (
    <div className="card">
      <div className="card__header">
        <NavLink
          to="/add-account"
          className="btn btn-primary"
          style={{ borderRadius: 50 }}
        >
          Thêm tài khoản
        </NavLink>
      </div>
      <div className="mb-3 mt-3">
        <div className="form-check form-check-inline mr-5 ml-1">
          <input
            className="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            value="TẤT CẢ"
            onChange={(event) => getAccountByRoleHandler(event.target.value)}
            checked={role === "TẤT CẢ"}
          />
          <label className="form-check-label">Tất cả</label>
        </div>
        <div className="form-check form-check-inline mr-5 ml-1">
          <input
            className="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            value="ADMIN"
            onChange={(event) => getAccountByRoleHandler(event.target.value)}
            checked={role === "ADMIN"}
          />
          <label className="form-check-label">ADMIN</label>
        </div>
        <div className="form-check form-check-inline mr-5 ml-1">
          <input
            className="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            value="EMP"
            onChange={(event) => getAccountByRoleHandler(event.target.value)}
            checked={role === "EMP"}
          />
          <label className="form-check-label">Nhân viên</label>
        </div>
        <div className="form-check form-check-inline mr-5 ml-1">
          <input
            className="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            value="CUS"
            onChange={(event) => getAccountByRoleHandler(event.target.value)}
            checked={role === "CUS"}
          />
          <label className="form-check-label">Khách hàng</label>
        </div>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Username</th>
            <th scope="col">Họ tên</th>
            <th scope="col">Giới tính</th>
            <th scope="col">SDT</th>
            <th scope="col">Email</th>
            <th scope="col">Vai trò</th>
            <th scope="col">Trạng thái</th>
            <th scope="col">Cập nhật</th>
          </tr>
        </thead>
        <tbody>
          {account &&
            account.map((item, index) => (
              <tr key={index}>
                <th scope="row">{item.username}</th>
                <td>{item.fullName}</td>
                <td>{item.gender}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>
                  {" "}
                  <Badge
                    type={roleName[item.roleName]}
                    content={item.roleName}
                  />
                </td>
                <td>
                  <Badge
                    type={active[item.isActive]}
                    content={item.isActive ? "Hoạt động" : "Không hoạt động"}
                  />
                </td>
                <td>
                  <NavLink to={`/account-detail/${item.id}`} exact>
                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                  </NavLink>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <nav aria-label="Page navigation">
        <ul className="pagination offset-5 mt-3">
          <li className={page === 1 ? "page-item disabled" : "page-item"}>
            <button
              className="page-link"
              style={{ borderRadius: 50 }}
              onClick={() => onChangePage(1)}
            >
              {`<<`}
            </button>
          </li>
          {rows}
          <li className={page === total ? "page-item disabled" : "page-item"}>
            <button
              className="page-link"
              style={{ borderRadius: 50 }}
              onClick={() => onChangePage(total)}
            >
              {`>>`}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Account;
