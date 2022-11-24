import React from "react";
import { NavLink } from "react-router-dom";

const Error = () => {

  return (
    <div
      className="container text-center card"
      style={{ height: 600, paddingTop: 150}}
    >
      <div className="row">
        <div className="col-md-12">
          <div className="error-template">
            <h1>Oops!</h1>
            <h2>404 Not Found</h2>
            <div className="error-actions mt-5">
              <span className="glyphicon glyphicon-home" />
              <NavLink to="/" exact className='mini-card'>
                Về trang chủ
              </NavLink>
              
                <span className="glyphicon glyphicon-envelope" /> <NavLink to="/" exact className='mini-card'>
                Liên hệ hỗ trợ
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
