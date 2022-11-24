import React, { useState, useEffect } from "react";
import { reportByProduct } from "../../api/OrderApi";
import { NavLink, useHistory } from "react-router-dom";

const ReportProduct = () => {
  const [product, setProduct] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const history = useHistory();
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
    reportByProduct(page, 8)
      .then((resp) => {
        setProduct(resp.data.content);
        setTotal(resp.data.totalPages);
      })
      .catch((error) => console.log(error));
  }, [page]);

  const onChangePage = (page) => {
    setPage(page);
  };
  const goBack = () =>{
    history.goBack();
  }
  return (
    <div className="col-12">
      <div className="card">
        <div className="card__header">
          <h3 className="text-primary">Doanh thu theo sản phẩm</h3>
        </div>
        <button style={{width: 60}} onClick={() => goBack()}>
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
                <th scope="col">Mã sản phẩm</th>
                <th scope="col">Tên sản phẩm</th>
                <th scope="col">Số lượng bán</th>
                <th scope="col">Số lượng đơn</th>
                <th scope="col">Doanh thu</th>
              </tr>
            </thead>
            <tbody>
              {product &&
                product.map((item, index) => (
                  <tr key={index}>
                  <th scope="row"><NavLink to={`/order-product/${item.id}`} exact> {item.id}</NavLink></th>
                    <td>{item.name}</td>
                    <td>{item.quantity ? item.quantity : 0}</td>
                    <td>{item.count}</td>
                    <td>{item.amount ? item.amount : 0}</td>
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

export default ReportProduct;
