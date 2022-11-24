import React, {useState} from "react";
import Layout from "../admin/layout/Layout";
import "../assets/boxicons-2.0.7/css/boxicons.min.css";
import "../assets/css/grid.css";
import "../assets/css/index.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../static/css/style.css';
import { BrowserRouter as Router } from "react-router-dom";

const AdminLayOut = () => {

  const [user, setUser] = useState(null);

  const userHandler = (user) => {
    setUser(user);
  };

  return (
    <Router>
      <Layout user={user} userHandler={userHandler}></Layout>
      <ToastContainer></ToastContainer>
    </Router>
  );
};

export default AdminLayOut;
