import "./estilo.css";
import { connect } from "react-redux";
import { setAtributo, modificaDisplay } from "../../redux/actions";
import api from "../../connections/apiHello";
import HeaderDisplay from "../HeaderDisplay";
import IO from "socket.io-client";
import React from "react";

const mapStateToProps = (state) => {
  return {
    temaAtual: state.temaAtual,
    temas: state.temas,
    token: state.token,
    displayMain: state.displayMain,
  };
};

const estiloBotao = (tema) => {
  return {
    backgroundColor: tema.headerTextColor,
    color: tema.headerColor,
  };
};

const estiloHeader = (tema) => {
  return {
    color: tema.textColor,
    borderColor: tema.textColor,
    backgroundColor: tema.backgroundColor,
  };
};

async function getUUID(token, name, address, phone) {
  var payload = [{ name: name, address: address, phone: phone }];
  var header = {
    Authorization: `${token}`,
    "content-type": "application/json",
  };

  var UUID = await api.post("", payload, header);

  return UUID.data;
}


async function pegandoTextoAPI(props, name, address, phone) {
  //const socket = IO.connect("http://localhost:1900");
  const socket = IO.connect("http://localhost:8070", {
    path: "/ff-socket-server",
  });

  document.getElementById("buscarUsuarioButton").innerText = "Carregando";
  document.getElementById("buscarUsuarioButton").disabled = true;
  var UUID = await getUUID(props.token, name, address, phone);

  console.log("UUID", UUID);

  socket.on("data-collector-front-end", function (data) {
    const json = JSON.parse(data);
    if (json.uuid === UUID) {
      console.log("Print do Socket", json);
      if (json.raw.length > 0){
        props.setAtributo(
          "Outros",
          "Get Users",
          "userlist",
          json.raw
          //printaResultados(props, json.raw)
        );
        props.setAtributo(
          "Outros",
          "Get Users",
          "erroBusca",
          ""
        );
      }
      else {
        props.setAtributo(
          "Outros",
          "Get Users",
          "erroBusca",
          "Nenhum usuário encontrado"
        );
        props.setAtributo(
          "Outros",
          "Get Users",
          "userlist",
          []
        );
      }
      document.getElementById("buscarUsuarioButton").disabled = false;
      document.getElementById("buscarUsuarioButton").innerText = "Buscar";
      socket.close();
      console.log("Fechei o socket");
    }
  });
}

const mapDispatchToProps = (dispatch) => {
  return {
    mudaTextoOlaMundo: (item, servico, atributo, valor) => {
      dispatch(setAtributo(item, servico, atributo, valor));
    },
    setAtributo: (item, servico, atributo, valor) => {
      dispatch(setAtributo(item, servico, atributo, valor));
    },
    modificaDisplay: (display) => dispatch(modificaDisplay(display)),
  };
};

function OlaMundo(props) {
  const [nome, setNome] = React.useState("");
  const [ID, setID] = React.useState("");
  const [endereco, setEndereco] = React.useState("");
  const [telefone, setTelefone] = React.useState("");

  if (
    props.displayMain.atributos[
      props.atributos.map((e) => e.nome).indexOf("userlist")
    ].valor === ""
  ) {
    props.setAtributo("Outros", "Get Users", "userlist", []);
  }

  return (
    <div className="main-getuser">
      <HeaderDisplay
        style={props.temas[props.temaAtual]}
        name="Get Users"
      ></HeaderDisplay>
      <div
        className="body-display-getuser"
        style={{
          backgroundColor: props.temas[props.temaAtual].backgroundColor,
        }}
      >
        <div className="cardlist-getuser">
          <div
            className="body-display-card-getuser"
            style={{
              backgroundColor: props.temas[props.temaAtual].headerColor,
              color: props.temas[props.temaAtual].headerTextColor,
            }}
          >
            <h1
              style={estiloHeader(props.temas[props.temaAtual])}
              className="body-display-header-getuser"
            >
              Buscar usuários
            </h1>
            <div className="body-display-content-getuser">
              <form
                className="form-getuser"
                onSubmit={(event) => {
                  event.preventDefault();
                  console.log(
                    "Nome: " +
                      nome +
                      "/ ID: " +
                      ID +
                      "/ Endereço: " +
                      endereco +
                      "/ Telefone: " +
                      telefone
                  );
                  pegandoTextoAPI(props, nome, endereco, telefone);
                }}
              >
                <div className="body-display-content-inputlist-getuser">
                  <div className="body-display-content-input-getuser">
                    <label
                      className="body-display-content-text-getuser"
                      htmlFor="userName"
                    >
                      Nome:
                    </label>
                    <input
                      value={nome}
                      className="input-getuser"
                      onChange={(event) => {
                        let tempNome = event.target.value;

                        setNome(tempNome);
                      }}
                      id="userName"
                      type="text"
                    />
                  </div>
                  <div className="body-display-content-input-getuser">
                    <label
                      className="body-display-content-text-getuser"
                      htmlFor="userName"
                    >
                      ID:
                    </label>
                    <input
                      value={ID}
                      className="input-getuser"
                      onChange={(event) => {
                        let tempID = event.target.value;

                        setID(tempID);
                      }}
                      id="userID"
                      type="text"
                    />
                  </div>
                  <div className="body-display-content-input-getuser">
                    <label
                      className="body-display-content-text-getuser"
                      htmlFor="userName"
                    >
                      Endereço:
                    </label>
                    <input
                      value={endereco}
                      className="input-getuser"
                      onChange={(event) => {
                        let tempEndereco = event.target.value;

                        setEndereco(tempEndereco);
                      }}
                      id="userEnedereco"
                      type="text"
                    />
                  </div>
                  <div className="body-display-content-input-getuser">
                    <label
                      className="body-display-content-text-getuser"
                      htmlFor="userName"
                    >
                      Telefone:
                    </label>
                    <input
                      value={telefone}
                      className="input-getuser"
                      onChange={(event) => {
                        let tempTelefone = event.target.value;

                        setTelefone(tempTelefone);
                      }}
                      id="userTelefone"
                      type="text"
                    />
                  </div>
                </div>
                <button
                  style={estiloBotao(props.temas[props.temaAtual])}
                  className="body-display-button-form-getuser"
                  type="submit"
                  id="buscarUsuarioButton"
                >
                  Buscar
                </button>
              </form>
            </div>
          </div>
          <div
            className="body-display-card-getuser"
            style={{
              backgroundColor: props.temas[props.temaAtual].headerColor,
              color: props.temas[props.temaAtual].headerTextColor,
            }}
          >
            <h1
              style={estiloHeader(props.temas[props.temaAtual])}
              className="body-display-header-getuser"
            >
              Resultados
            </h1>
            <h1 className="response-errormsg-getuser">
                {
                  props.displayMain.atributos[
                    props.atributos.map((e) => e.nome).indexOf("erroBusca")
                  ].valor
                }
              </h1>
            <div className="response-cardlist-getuser">
              

              {props.displayMain.atributos[
                props.atributos.map((e) => e.nome).indexOf("userlist")
              ].valor.map((item, index) => {
                return (
                  <div className="response-card-getuser">
                    <h1
                      className="response-card-header-getuser"
                      style={estiloHeader(props.temas[props.temaAtual])}
                    >
                      ID: {item.id}
                    </h1>
                    <div
                      className="response-card-body-getuser"
                      style={{
                        color: props.temas[props.temaAtual].headerColor,
                        backgroundColor:
                          props.temas[props.temaAtual].headerTextColor,
                      }}
                    >
                      <h1 className="response-label-getuser">
                        Nome: {item.name}
                      </h1>
                      <h1 className="response-label-getuser">
                        Endereço: {item.address}
                      </h1>
                      <h1 className="response-label-getuser">
                        Telefone: {item.phone}
                      </h1>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(OlaMundo);
