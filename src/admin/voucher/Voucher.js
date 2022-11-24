import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getVouchers } from "../../api/VoucherApi";

const Voucher = () => {
  const [voucher, setVoucher] = useState();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();

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
    getVouchers(page, 9).then((resp) => {
      setVoucher(resp.data.content);
      setTotal(resp.data.totalPages);
    });
  };

  return (
    <div className="card">
      <div className="card__header mb-5">
        <NavLink
          to="/add-voucher"
          className="btn btn-primary"
          style={{ borderRadius: 50 }}
        >
          Thêm voucher
        </NavLink>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Code</th>
            <th scope="col">Giảm giá(%)</th>
            <th scope="col">Lượt sử dụng</th>
            <th scope="col">Ngày hết hạn</th>
            <th scope="col">Trạng thái</th>
            <th scope="col">Cập nhật</th>
          </tr>
        </thead>
        <tbody>
          {voucher &&
            voucher.map((item, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{item.code}</td>
                <td>{item.discount}</td>
                <td>{item.count}</td>
                <td>{item.expireDate}</td>
                <td>{item.isActive ? "Hoạt động" : "Không hoạt động"}</td>
                <td>
                  {" "}
                  <NavLink to={`/voucher-detail/${item.id}`} exact>
                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                  </NavLink>{" "}
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

export default Voucher;
