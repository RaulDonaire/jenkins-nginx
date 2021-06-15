import "./estilo.css";
import { connect } from "react-redux";
import HeaderDisplay from "../HeaderDisplay";
import { filterByName } from "../../helpers/filterByName";

const mapStateToProps = (state) => {
  return {
    temaAtual: state.temaAtual,
    temas: state.temas,
    token: state.token,
  };
};

const estiloHeader = (tema) => {
  return {
    color: tema.textColor,
    borderColor: tema.textColor,
    backgroundColor: tema.backgroundColor,
  };
};

function GetUsers(props) {
  return (
    <div className="main-getUser">
      <HeaderDisplay
        style={props.temas[props.temaAtual]}
        name="Lista de Usuários"
      ></HeaderDisplay>
      <div
        className="body-display"
        style={{
          backgroundColor: props.temas[props.temaAtual].backgroundColor,
        }}
      >
        <div className="cardlist-getUser">
          {props.atributos[filterByName(props.atributos, "users")].valor.map(
            (item, index) => {
              return (
                <div className="card-getUser">
                  <h1
                    className="cardHeader-getUser"
                    style={estiloHeader(props.temas[props.temaAtual])}
                  >
                    ID: {item.id}
                  </h1>
                  <div
                    className="cardBody-getUser"
                    style={{
                      backgroundColor: props.temas[props.temaAtual].headerColor,
                      color: props.temas[props.temaAtual].headerTextColor,
                    }}
                  >
                    <h1 className="label-getUser">Nome: {item.name}</h1>
                    <h1 className="label-getUser">Endereço: {item.address}</h1>
                    <h1 className="label-getUser">Telefone: {item.phone}</h1>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, null)(GetUsers);
