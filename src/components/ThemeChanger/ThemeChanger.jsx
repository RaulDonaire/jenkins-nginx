import "./estilo.css";
import { connect } from "react-redux";
import React from "react";
import { modificaDisplay, modificaTema } from "../../redux/actions";

const mapStateToProps = (state) => {
  return {
    estilos: state.estilos,
    temaAtual: state.temaAtual,
    displayMain: state.displayMain,
    temas: state.temas,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    modificaDisplay: (display) => dispatch(modificaDisplay(display)),
    modificaTema: (tema) => {
      dispatch(modificaTema(tema));
    },
  };
};

const estiloHeader = (tema) => {
  return {
    color: tema.textColor,
    borderColor: tema.textColor,
  };
};

function ThemeChanger(props) {
  return (
    <div className="home">
      <div className="header-display">
        <h1
          style={estiloHeader(props.temas[props.temaAtual])}
          className="header-display-text"
        >
          {" "}
          Selecione um tema
        </h1>
      </div>
      <div className="body-display">
        {props.temas.map((tema) => {
          return (
            <div onClick={() => props.modificaTema(tema.index)}
            className="theme-card">
              <img src="" alt={tema.nome} className="theme-card-img"/>
              <h1 className="theme-card-label">
                {tema.nome}
              </h1>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ThemeChanger);
