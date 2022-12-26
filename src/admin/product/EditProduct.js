import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "../image/CardProfile.css";
import { getBrands } from "../../api/BrandApi";
import { getSale } from "../../api/SaleApi";
import { getCategory } from "../../api/CategoryApi";
import { getProductById, modifyProduct } from "../../api/ProductApi";
import { toast } from "react-toastify";
import { useHistory, useParams } from "react-router-dom";

const EditProduct = () => {
  const [brand, setBrand] = useState([]);
  const [sale, setSale] = useState([]);
  const [cate, setCate] = useState([]);
  const [item, setItem] = useState();
  const [attributes, setAttributes] = useState([]);
  const [flag, setFlag] = useState([]);
  const { id } = useParams();
  const history = useHistory();
  const [count, setCount] = useState(0);
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    onLoad();
  }, []);

  const changeCountHandler = (value) => {
    setCount(value);
  };

  const onLoad = () => {
    getBrands(1, 20)
      .then((resp) => setBrand(resp.data.content))
      .catch((error) => console.log(error));

    getSale(1, 8)
      .then((resp) => setSale(resp.data.content))
      .catch((error) => console.log(error));

    getProductById(id)
      .then((res) => {
        setItem(res.data);
        setFlag(res.data.category);
        setAttributes(res.data.attributes);
        setCount(res.data.attributes.length);
        getCategory(1, 20)
          .then((resp) => setCate(resp.data.content))
          .catch((error) => console.log(error));

        reset(res.data);
      })
      .catch((error) => console.log(error));
  };
  const submitHandler = (data) => {
    const nums = [
      data.type1,
      data.type2,
      data.type3,
      data.type4,
      data.type5,
    ];
    const newNums = nums.slice(0, count);
    const hasDuplicate = newNums.some(x => newNums.indexOf(x) !== newNums.lastIndexOf(x));
    if(hasDuplicate){
      toast.warning("Nhập trùng loại. Vui lòng nhập lại!");
    }else{
      const flag = {
        id: id,
        name: data.name,
        code: data.code,
        description: data.description,
        brandId: data.brandId,
        saleId: data.saleId,
        categoryId: data.category,
        attribute: [
          {
            type: data.type1,
            price: data.price1,
            stock: data.quantity1,
          },
          {
            type: data.type2,
            price: data.price2,
            stock: data.quantity2,
          },
          {
            type: data.type3,
            price: data.price3,
            stock: data.quantity3,
          },
          {
            type: data.type4,
            price: data.price4,
            stock: data.quantity4,
          },
          {
            type: data.type5,
            price: data.price5,
            stock: data.quantity5,
          }
        ].slice(0, count),
      };
      modifyProduct(flag)
        .then(() => {
          toast.success("Cập nhật thành công!");
          history.push("/products");
        })
        .catch((error) => toast.error(error.response.data.Errors));
        
    }
    
  };
  return (
    <div className="pb-3 container-fluid card">
      <div className="col-10 offset-1 text-center">
        <h1 className="text-danger">Sản phẩm</h1>
      </div>
      <div className="row card">
        <form
          className="needs-validation pro-form"
          onSubmit={handleSubmit(submitHandler)}
        >
          <div className="col-10">
            <div className="row g-3">
              <div className="col-sm-6">
                <label className="form-label">Tên sản phẩm</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("name", {
                    required: true,
                    pattern: /^\s*\S+.*/,
                  })}
                />
                {errors.name && (
                  <div className="alert alert-danger" role="alert">
                    Tên sản phẩm không hợp lệ!
                  </div>
                )}
              </div>
              <div className="col-sm-6">
                <label className="form-label">Code</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("code", {
                    required: true,
                    pattern: /^\s*\S+.*/,
                  })}
                />
                {errors.code && (
                  <div className="alert alert-danger" role="alert">
                    Code không hợp lệ!
                  </div>
                )}
              </div>
              <div className="col-12 mt-5">
                <label className="form-label">Mô tả sản phẩm</label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows={3}
                  {...register("description", {
                    required: true,
                    pattern: /^\s*\S+.*/,
                  })}
                />
                {errors.description && (
                  <div className="alert alert-danger" role="alert">
                    Mô tả không hợp lệ!
                  </div>
                )}
              </div>
              <div className="col-sm-6 mt-5">
                <label className="form-label">Nhà xuất bản</label>
                <select
                  className="form-control"
                  {...register("brandId", { required: true })}
                >
                  {brand &&
                    brand.map((item, index) => (
                      <option value={item.id} key={index}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-sm-6 mt-5">
                <label className="form-label">Chương trình giảm giá</label>
                <select
                  className="form-control"
                  {...register("saleId", { required: true })}
                >
                  {sale &&
                    sale.map((item, index) => (
                      <option value={item.id} key={index}>
                        {item.name} - {item.discount} %
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-12 mt-5 mb-5">
                <label className="form-label mb-3">Danh mục</label> <br />
                {cate &&
                  cate.map((i, index) => (
                    <div
                      className="col-2 form-check form-check-inline mr-5"
                      key={index}
                    >
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue={i.id}
                        defaultChecked={flag.includes(i.id)}
                        {...register("category", { required: true })}
                      />
                      <label className="form-check-label">{i.name}</label>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="col-10 row">
            <div className="card mr-5 col-10">
              <h4 className="d-flex justify-content-between align-items-center mb-1">
                <span className="text-dark">Chi tiết sản phẩm</span> <br />
              </h4>
              <span className="text-dark">Số lượng</span>{" "}
              <select
                class="form-control mb-2"
                onChange={(e) => changeCountHandler(e.target.value)}
                value={count}
              >
                {numbers.map((item, index) => (
                  <option value={item} key={index} disabled={item < attributes.length} hidden={item < attributes.length}>
                    {index + 1}
                  </option>
                ))}
              </select>
              <br />
            </div>
            {count >= 1 && (
              <div className="card mr-3">
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Loại</label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={item.attributes[0] && item.attributes[0].type}
                      {...register("type1", {
                        required: true,
                      })}
                    />
                    {errors.type1 && (
                      <p className="text-danger mt-2">
                        Loại sách không hợp lệ!
                      </p>
                    )}
                  </div>
                  <div className="form-group col-md-6">
                    <label>Giá</label>
                    <input
                      type="number"
                      className="form-control"
                      defaultValue={item.attributes[0] && item.attributes[0].price}
                      {...register("price1", {
                        required: true,
                        min: 1,
                      })}
                    />
                    {errors.price1 && (
                      <p className="text-danger mt-2">Giá sản phẩm lớn hơn 0</p>
                    )}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-10">
                    <label>Số lượng</label>
                    <input
                      type="number"
                      className="form-control"
                      defaultValue={item.attributes[0] && item.attributes[0].stock}
                      {...register("quantity1", {
                        required: true,
                        min: 1,
                      })}
                    />
                    {errors.quantity1 && (
                      <p className="text-danger mt-2">
                        Số lượng sản phẩm lớn hơn 1
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
            {count >= 2 && (
              <div className="card mr-3">
                <div className="form-row">
                <div className="form-group col-md-6">
                    <label>Loại</label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={item.attributes[1] && item.attributes[1].type}
                      {...register("type2", {
                        required: true,
                      })}
                    />
                    {errors.type2 && (
                      <p className="text-danger mt-2">
                        Loại sách không hợp lệ!
                      </p>
                    )}
                  </div>
                  <div className="form-group col-md-6">
                    <label>Giá</label>
                    <input
                      type="number"
                      className="form-control"
                      defaultValue={item.attributes[1] && item.attributes[1].price}
                      {...register("price2", {
                        required: true,
                        min: 1,
                      })}
                    />
                    {errors.price2 && (
                      <p className="text-danger mt-2">Giá sản phẩm lớn hơn 0</p>
                    )}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-10">
                    <label>Số lượng</label>
                    <input
                      type="number"
                      className="form-control"
                      defaultValue={item.attributes[1] && item.attributes[1].stock}
                      {...register("quantity2", {
                        required: true,
                        min: 1,
                      })}
                    />
                    {errors.quantity2 && (
                      <p className="text-danger mt-2">
                        Số lượng sản phẩm lớn hơn 1
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
            {count >= 3 && (
              <div className="card mr-3">
                <div className="form-row">
                <div className="form-group col-md-6">
                    <label>Loại</label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={item.attributes[2] && item.attributes[2].type}
                      {...register("type3", {
                        required: true,
                      })}
                    />
                    {errors.type3 && (
                      <p className="text-danger mt-2">
                        Loại sách không hợp lệ!
                      </p>
                    )}
                  </div>
                  <div className="form-group col-md-6">
                    <label>Giá</label>
                    <input
                      type="number"
                      className="form-control"
                      defaultValue={item.attributes[2] && item.attributes[2].price}
                      {...register("price3", {
                        required: true,
                        min: 1,
                      })}
                    />
                    {errors.price3 && (
                      <p className="text-danger mt-2">Giá sản phẩm lớn hơn 0</p>
                    )}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-10">
                    <label>Số lượng</label>
                    <input
                      type="number"
                      className="form-control"
                      defaultValue={item.attributes[2] && item.attributes[2].stock}
                      {...register("quantity3", {
                        required: true,
                        min: 1,
                      })}
                    />
                    {errors.quantity3 && (
                      <p className="text-danger mt-2">
                        Số lượng sản phẩm lớn hơn 1
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
            {count >= 4 && (
              <div className="card mr-3">
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Loại</label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={item.attributes[3] && item.attributes[3].type}
                      {...register("type4", {
                        required: true,
                      })}
                    />
                   {errors.type4 && (
                      <p className="text-danger mt-2">
                        Loại sách không hợp lệ!
                      </p>
                    )}
                  </div>
                  <div className="form-group col-md-6">
                    <label>Giá</label>
                    <input
                      type="number"
                      className="form-control"
                      defaultValue={item.attributes[3] && item.attributes[3].price}
                      {...register("price4", {
                        required: true,
                        min: 1,
                      })}
                    />
                    {errors.price4 && (
                      <p className="text-danger mt-2">Giá sản phẩm lớn hơn 0</p>
                    )}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-10">
                    <label>Số lượng</label>
                    <input
                      type="number"
                      className="form-control"
                      defaultValue={item.attributes[3] && item.attributes[3].stock}
                      {...register("quantity4", {
                        required: true,
                        min: 1,
                      })}
                    />
                    {errors.quantity4 && (
                      <p className="text-danger mt-2">
                        Số lượng sản phẩm lớn hơn 1
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
            {count >= 5 && (
              <div className="card mr-3">
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Loại</label>
                    <input
                      type="number"
                      className="form-control"
                      defaultValue={item.attributes[4] && item.attributes[4].type}
                      {...register("type5", {
                        required: true,
                      })}
                    />
                    {errors.type5 && (
                      <p className="text-danger mt-2">
                        Loại sách không hợp lệ!
                      </p>
                    )}
                  </div>
                  <div className="form-group col-md-6">
                    <label>Giá</label>
                    <input
                      type="number"
                      className="form-control"
                      defaultValue={item.attributes[4] && item.attributes[4].price}
                      {...register("price5", {
                        required: true,
                        min: 1,
                      })}
                    />
                    {errors.price5 && (
                      <p className="text-danger mt-2">Giá sản phẩm lớn hơn 0</p>
                    )}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-10">
                    <label>Số lượng</label>
                    <input
                      type="number"
                      className="form-control"
                      defaultValue={item.attributes[4] && item.attributes[4].stock}
                      {...register("quantity5", {
                        required: true,
                        min: 1,
                      })}
                    />
                    {errors.quantity5 && (
                      <p className="text-danger mt-2">
                        Số lượng sản phẩm lớn hơn 1
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          <button
            className="btn btn-primary btn-lg mt-5 mb-5"
            type="submit"
            style={{ marginLeft: 70, borderRadius: 50 }}
          >
            Cập nhật
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
