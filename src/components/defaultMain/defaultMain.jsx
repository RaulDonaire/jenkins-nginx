import "./estilo.css";
import { connect } from "react-redux";
import HeaderDisplay from "../HeaderDisplay";

const mapStateToProps = (state) => {
  return {
    temaAtual: state.temaAtual,
    displayMain: state.displayMain,
    temas: state.temas,
    username: state.username,
  };
};


function defaultMain(props) {
  return (
    <div className="home">
      <HeaderDisplay style={props.temas[props.temaAtual]} name="Home"></HeaderDisplay>
      <div className="body-display" style={{backgroundColor: props.temas[props.temaAtual].backgroundColor}}>
        <h1 className="body-display-text" style={{color: props.temas[props.temaAtual].textColor}}>{props.username}, seja bem vindo!!!</h1>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, null)(defaultMain);
