import "./estilo.css";
import { connect } from "react-redux";
import { filterByName } from "../../helpers/filterByName";
import { setAtributo, modificaDisplay } from "../../redux/actions";
import HeaderDisplay from "../HeaderDisplay";

const mapStateToProps = (state) => {
  return {
    temaAtual: state.temaAtual,
    displayMain: state.displayMain,
    temas: state.temas,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAtributo: (item, servico, atributo, valor) => {
      dispatch(setAtributo(item, servico, atributo, valor));
    },
    modificaDisplay: (display) => dispatch(modificaDisplay(display)),
  };
};

const estiloHeader = (tema) => {
  return {
    color: tema.textColor,
    borderColor: tema.textColor,
    backgroundColor: tema.backgroundColor,
  };
};

const estiloBotao = (tema) => {
  return {
    backgroundColor: tema.headerTextColor,
    color: tema.headerColor,
  };
};

const processaNome = (nome) => {
  return "Bolo de " + nome;
};

function Receita(props) {
  return (
    <div className="home">
      <HeaderDisplay
        style={props.temas[props.temaAtual]}
        name={processaNome(
          props.atributos[filterByName(props.atributos, "ingrediente")].valor
        )}
      ></HeaderDisplay>
      <div className="body-display" style={{backgroundColor: props.temas[props.temaAtual].backgroundColor}}>
        <div className="card-receita" style={{backgroundColor: props.temas[props.temaAtual].headerColor, color: props.temas[props.temaAtual].headerTextColor}}>
          <h1
            style={estiloHeader(props.temas[props.temaAtual])}
            className="card-receita-header"
          >
            Receita
          </h1>
          <ul className="lista-ingredientes">
            <li>
              1 - Comprar{" "}
              {
                props.atributos[filterByName(props.atributos, "ingrediente")]
                  .valor
              }
            </li>
            <li>2 - Misturar tudo</li>
            <li>3 - Botar no forno</li>
            <li>4 - Esperar</li>
            <li>5 - Comer</li>
            <li>
              Bolos disponíveis:{" "}
              {
                props.atributos[
                  filterByName(props.atributos, "quantidadeBolos")
                ].valor
              }
            </li>
          </ul>
          <button
            style={estiloBotao(props.temas[props.temaAtual])}
            className="button-bolo"
            onClick={() => {
              if (
                props.atributos[
                  filterByName(props.atributos, "quantidadeBolos")
                ].valor > 0
              ) {
                alert(
                  "Comprei um bolo de " +
                    props.atributos[
                      filterByName(props.atributos, "ingrediente")
                    ].valor
                );
                props.setAtributo(
                  "Receitas",
                  props.displayMain.nome,
                  "quantidadeBolos",
                  props.atributos[
                    filterByName(props.atributos, "quantidadeBolos")
                  ].valor - 1
                );
              } else alert("Acabou o bolo");
            }}
          >
            Comprar bolo
          </button>
        </div>
        <div className="card-bolo" style={{backgroundColor: props.temas[props.temaAtual].headerColor}}>
          <img
            className="img-bolo"
            alt="imgBolo"
            src={
              props.atributos[filterByName(props.atributos, "srcFoto")].valor
            }
          />
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Receita);
