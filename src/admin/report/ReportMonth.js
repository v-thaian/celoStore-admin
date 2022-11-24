import React, { useState, useEffect } from "react";
import {
  reportAmountMonth,
  getOrderByOrderStatusAndYearAndMonth,
} from "../../api/OrderApi";
import { NavLink, useHistory, useParams } from "react-router-dom";

const ReportMonth = (props) => {
  const { id } = useParams();
  const history = useHistory();
  const [month, setMonth] = useState([]);
  const [year, setYear] = useState();
  const [order, setOrder] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const [select, setSelect] = useState();

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
    setYear(id);
    reportAmountMonth(id)
      .then((resp) => setMonth(resp.data))
      .catch((error) => console.log(error));
    props.yearHandler(id);
  }, []);

  const goBack = () => {
    history.goBack();
  };

  const changeYearHandler = (value) => {
    setYear(value);
    setOrder([]);
    reportAmountMonth(value)
      .then((resp) => setMonth(resp.data))
      .catch((error) => console.log(error));
    props.yearHandler(id);
  };

  const onChangePage = (page) => {
    setPage(page);
  };

  const clickHandler = (value) => {
    setSelect(value);
    getOrderByOrderStatusAndYearAndMonth(3, year, value, page, 8)
      .then((resp) => {
        setOrder(resp.data.content);
        setTotal(resp.data.totalPages);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="col-12">
      <div className="card">
        <button style={{ width: 60 }} onClick={() => goBack()}>
          <i
            className="fa fa-arrow-left"
            style={{ fontSize: 18 }}
            aria-hidden="true"
          ></i>
        </button>
        <div className="card__header text-center">
          <h3 className="text-primary">Doanh thu của Năm {year}</h3>
        </div>
        <div className="col-sm-4 mt-2">
          <select
            className="form-control"
            onChange={(e) => changeYearHandler(e.target.value)}
            defaultValue={id}
          >
            <option value="2018">2018</option>
            <option value="2019">2019</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
          </select>
        </div>
        <div className="card__body">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Tháng</th>
                <th scope="col">Số lượng đơn</th>
                <th scope="col">Doanh thu</th>
              </tr>
            </thead>
            <tbody>
              {month &&
                month.map((item, index) => (
                  <tr key={index} className={select === item.month ? "table-danger" : ""}>
                    <th scope="row">
                      <button
                        style={{ margin: 0, borderRadius: 0, padding: 0, backgroundColor: select === item.month ? '#f5c6cb' : 'white', width: 100 }}
                        onClick={() => clickHandler(item.month)}
                      >
                        #000{index + 1}
                      </button>
                    </th>
                    <td>{item.month}</td>
                    <td>{item.count}</td>
                    <td>{item.total && item.total.toLocaleString()} đ</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {order.length > 0 && (
        <div className="card">
          <div className="card__header text-center">
            <h3 className="text-primary">Đơn hàng trong tháng</h3>
          </div>
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
                  className={
                    page === total ? "page-item disabled" : "page-item"
                  }
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
      )}
    </div>
  );
};

export default ReportMonth;
