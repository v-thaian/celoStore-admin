import { React, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getProductById } from "../../api/ProductApi";
import { useParams } from "react-router-dom";
import { getAttribute } from "../../api/AttributeApi";

const Detail = () => {
    const { id } = useParams();
    const [item, setItem] = useState();
    const [attributes, setAttributes] = useState();
    const [price, setPrice] = useState();
    const [stock, setStock] = useState();
    const [flag, setFlag] = useState();
    const history = useHistory();

    useEffect(() => {
      onLoad();
    }, [id]);
  
    const onLoad = () => {
      getProductById(id)
        .then((res) => {
          setItem(res.data);
          setAttributes(res.data.attributes);
        })
        .catch((error) => console.log(error));

      getAttribute(id, 39)
        .then((res) => {
          onModify(res.data.price, res.data.stock, res.data.id);
        })
        .catch((error) => console.log(error));
    };
  
    const onModify = (price, stock, flag) => {
      setPrice(price);
      setStock(stock);
      setFlag(flag);
    };

    const goBack = () => {
        history.goBack();
      };
    return (
      <div>
        {item && (
          <div className="col-12 mt-5">
            <div>
              <div className="card mb-3 border-0">
              <button style={{ width: 60 }} onClick={() => goBack()}>
          <i
            className="fa fa-arrow-left"
            style={{ fontSize: 18 }}
            aria-hidden="true"
          ></i>
        </button>
                <div className="row g-0">
                
                  <div className="col-md-4">
                    <img
                      src={require(`../../static/images/${item.main}`)}
                      className="img-fluid rounded-start"
                      style={{ width: "600px", height: "400px" }}
                      alt=""
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h1 className="card-title text-danger fw-bolder">
                        {item.name}
                      </h1>
                      <hr />
                      <p className="card-text fw-bold fs-5">Mã SP: {item.code}</p>
                      <hr />
                      <h4 className="card-text fw-bolder text-danger fs-5">
                        Giá bán:{" "}
                        {price &&
                          (
                            (price * (100 - item.discount)) /
                            100
                          ).toLocaleString() + " đ"}
                      </h4>
                      <h6 className="card-text fw-bolder fs-5">
                        Giá gốc:{" "}
                        <del>{price && price.toLocaleString() + " đ"}</del>
                      </h6>
                      <h6 className="card-text fw-bolder fs-5" hidden>
                        Sản phẩm còn: {stock && stock + " đôi"}
                      </h6>
                      <hr />
                      <div className="div">
                        <label className="mr-5">Chọn size</label>
                        {attributes.map((i, index) => (
                          <div
                            className="form-check form-check-inline"
                            key={index}
                          >
                            <input
                              className="form-check-input"
                              type="radio"
                              name="inlineRadioOptions"
                              id="inlineRadio3"
                              defaultValue="option3"
                              onChange={() => onModify(i.price, i.stock, i.id)}
                              disabled={i.stock === 0}
                              checked={flag == i.id}
                            />
                            <label className="form-check-label">{i.size}</label>
                          </div>
                        ))}
                      </div>                    
                      <hr />                     
                    </div>
                  </div>
                  <div className="container row offset-3 mt-5">
                    <img
                      src={require(`../../static/images/${item.images[0]}`)}
                      alt="..."
                      className="img-thumbnail mr-3"
                      style={{ width: "200px", height: "200px" }}
                    />
                    <img
                      src={require(`../../static/images/${item.images[1]}`)}
                      alt="..."
                      className="img-thumbnail mr-3"
                      style={{ width: "200px", height: "200px" }}
                    />
                    <img
                      src={require(`../../static/images/${item.images[2]}`)}
                      alt="..."
                      className="img-thumbnail mr-3"
                      style={{ width: "200px", height: "200px" }}
                    />
                    <img
                      src={require(`../../static/images/${item.images[3]}`)}
                      alt="..."
                      className="img-thumbnail mr-3"
                      style={{ width: "200px", height: "200px" }}
                    />
                    <img
                      src={require(`../../static/images/${item.images[4]}`)}
                      alt="..."
                      className="img-thumbnail mr-3"
                      style={{ width: "200px", height: "200px" }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-8 offset-2">
                <div className="container-fluid padding">
                  <div className="row welcome text-center text-dark mb-2 mt-5">
                    <div className="col-12">
                      <p className="display-4" style={{ fontSize: "34px" }}>
                        Mô tả sản phẩm
                      </p>
                    </div>
                  </div>
                </div>
                <div className="container-fluid padding">
                  <h5 className="font-italic">{item.description}</h5>
                </div>
              </div>
            </div>          
          </div>
        )}
      </div>
    );
}

export default Detail