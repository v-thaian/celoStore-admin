import React, { useState, useEffect } from "react";
import { getOrderByOrderStatusAndYearAndMonth } from "../../api/OrderApi";
import { NavLink, useHistory, useParams } from "react-router-dom";

const OrderMonth = (props) => {
  const { id } = useParams();
  const history = useHistory();

  const [order, setOrder] = useState([]);
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

  useEffect(() => {
    getOrderByOrderStatusAndYearAndMonth(3, props.year, id, page, 8)
      .then((resp) => {
        setOrder(resp.data.content);
        setTotal(resp.data.totalPages);
      })
      .catch((error) => console.log(error));
  }, [page]);

  const onChangePage = (page) => {
    setPage(page);
  };
  const goBack = () => {
    history.goBack();
  };
  return (
    <div className="col-12">
      <div className="card">
        <div className="card__header text-center">
          <h3 className="text-primary">Đơn hàng trong tháng</h3>
        </div>
        <button style={{ width: 60 }} onClick={() => goBack()}>
          <i
            className="fa fa-arrow-left"
            style={{ fontSize: 18 }}
            aria-hidden="true"
          ></i>
        </button>
        <div className="card__body">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Mã đơn hàng</th>
                <th scope="col">Tên khách hàng</th>
                <th scope="col">Số điện thoại</th>
                <th scope="col">Địa chỉ</th>
                <th scope="col">Ngày tạo</th>
                <th scope="col">Tổng tiền</th>
              </tr>
            </thead>
            <tbody>
              {order &&
                order.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">
                      <NavLink to={`/detail-order/${item.id}`} exact>
                        #OD{item.id}
                      </NavLink>
                    </th>
                    <td>{item.fullname}</td>
                    <td>{item.phone}</td>
                    <td>{item.address}</td>
                    <td>{item.createDate}</td>
                    <td>{item.total}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <nav aria-label="navigation">
            <ul className="pagination mt-3">
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
              <li
                className={page === total ? "page-item disabled" : "page-item"}
              >
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
      </div>
    </div>
  );
};

export default OrderMonth;
