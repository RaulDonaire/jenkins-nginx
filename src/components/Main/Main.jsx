import "./estilo.css";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    displayMain: state.displayMain,
  };
};

function Main(props) {
  return (
    <div className="main-display">
      {
        <props.displayMain.componenteReact
          atributos={props.displayMain.atributos}
        />
      }
    </div>
  );
}

export default connect(mapStateToProps, null)(Main);
