import "./estilo.css";

const estiloHeader = (tema) => {
  return {
    color: tema.headerTextColor,
    borderColor: tema.textColor,
  };
};

function HeaderDisplay(props) {
  return (
    <div className="header-display" style={{backgroundColor: props.style.headerColor}}>
      <h1
        style={estiloHeader(props.style)}
        className="header-display-text"
      >
        {props.name}
      </h1>
    </div>
  );
}

export default HeaderDisplay;
