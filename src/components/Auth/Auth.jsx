import "./estilo.css";
import { autentica } from "../../redux/actions";
import { connect } from "react-redux";
import React from "react";
import keyCloak from "../../connections/keyCloak";
import coverLogin from "../../assets/img-login.jpg";
import logoFlink from "../../assets/logo-flink-bco.png";

const mapStateToProps = (state) => {
  return {
    estiloAtual: state.estiloAtual,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    autentica: (token) => {
      dispatch(autentica(token));
    },
  };
};

async function pegandoToken(event, username, password, props) {
  document.getElementById("button").innerText = "Carregando";
  document.getElementById("button").disabled = true;
  event.preventDefault();
  var querystring = require("querystring");
  try {
    const token = await keyCloak.post(
      "",
      querystring.stringify({
        username: username,
        password: password,
        //client_id: "client-test",
        client_id: "client1",
        grant_type: "password",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log("Token de resposta", token.data);
    props.autentica(token.data);
  } catch (error) {
    alert("Usuário ou senha incorretos!");
    document.getElementById("button").disabled = false;
    document.getElementById("button").innerText = "Login";
  }
}

function Auth(props) {
  const [login, setLogin] = React.useState("");
  const [senha, setSenha] = React.useState("");

  return (
    <div className="canvas">
      <div className="div-figura">
        <img className="figura" src={coverLogin} alt="cover login" />
      </div>
      <div className="login">
        <img className="login-logo" src={logoFlink} alt="cover login" />
        <form
          className="login-form"
          onSubmit={(event) => pegandoToken(event, login, senha, props)}
        >
          <label className="login-label" htmlFor="login">
            E-mail ID*
          </label>
          <input
            value={login}
            className="login-input"
            onChange={(event) => {
              let tempLogin = event.target.value;

              setLogin(tempLogin);
            }}
            id="login"
            type="text"
          />
          <label className="login-label" htmlFor="senha">
            Senha*
          </label>
          <input
            value={senha}
            onChange={(event) => {
              let tempSenha = event.target.value;

              setSenha(tempSenha);
            }}
            className="login-input"
            id="senha"
            type="password"
          />
          <button className="button-login" id="button" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
