import React from "react";
import Sidebar from "../sidebar/Sidebar";
import Routes from "../Routes";
import TopNav from "../topnav/TopNav";
import { Route, BrowserRouter } from "react-router-dom";
import "./layout.css";
import SignIn from "../authenticate/SignIn";

const Layout = (prop) => {
  return (
    <BrowserRouter>
      {prop.user && (
        <Route
          render={(props) => (
            <div className="layout">
              <Sidebar {...props} user={prop.user}/>
              <div className="layout__content">
                <TopNav
                  user={prop.user}
                  userHandler={prop.userHandler}
                ></TopNav>
                <div className="layout__content-main">
                  <Routes>                  
                  </Routes>
                </div>
              </div>
            </div>
          )}
        ></Route>
      )}

      {!prop.user && <SignIn {...prop}></SignIn>}
    </BrowserRouter>
  );
};

export default Layout;
