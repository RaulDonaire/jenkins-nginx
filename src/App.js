//import "bootstrap/dist/css/bootstrap.min.css";
//import "./assets/styles/App.css";
//import "fontsource-roboto";
import "./assets/styles/fixer.scss";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Main from "./components/Main";
import Auth from "./components/Auth";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import getMenuAPI from "./helpers/getMenuAPI";
import { desloga } from "./redux/actions";

<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>;

<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css"
  rel="stylesheet"
  integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6"
  crossorigin="anonymous"
></link>;

const mapStateToProps = (state) => {
  return {
    token: state.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    desloga: () => {
      dispatch(desloga());
      alert("Seu token de acesso expirou!");
    },
  };
};

const checkAuth = (props) => {
  var stopTime;

  if (props.token === null) {
    return (
      <div className="auth">
        
        <Auth></Auth>
      </div>
    );
  } else {
    getMenuAPI(props.token.access_token);

    stopTime = setTimeout(function () {
      props.desloga();
    }, props.token.expires_in * 1000);

    return (
      <Fragment>
        <Header className="head" clearTime={stopTime}></Header>

        <div className="body">
          <div className="menu">
            <Menu></Menu>
          </div>
          <div className="main">
            <Main></Main>
          </div>
        </div>
      </Fragment>
    );
  }
};

function App(props) {
  return checkAuth(props);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
