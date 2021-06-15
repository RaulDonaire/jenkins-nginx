import { connect } from "react-redux";
import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import {
  modificaDisplay,
  setAtributo,
  desloga,
  modificaTema,
} from "../../redux/actions";
import defaultMain from "../defaultMain";
import "./estilo.css";
import avatar from "../../assets/foto-perfil.jpg";
import logoFlink from "../../assets/logo-flink.jpg";
import logoAlgar from "../../assets/logo-algar.jpg";
import logoDarkFlink from "../../assets/logo-darkflink.jpg";
import logoRedFlink from "../../assets/logo-redflink.jpg";

import Icon from "../Icon";

const mapDispatchToProps = (dispatch) => {
  return {
    setAtributo: (item, servico, atributo, valor) => {
      dispatch(setAtributo(item, servico, atributo, valor));
    },
    modificaDisplay: (display) => dispatch(modificaDisplay(display)),
    desloga: (clearTime) => {
      clearTimeout(clearTime);
      dispatch(desloga());
    },
    modificaTema: (tema) => {
      dispatch(modificaTema(tema));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    temaAtual: state.temaAtual,
    temas: state.temas,
    displayMain: state.displayMain,
    username: state.username,
  };
};

const CustomToggle = React.forwardRef(({ children, onClick, color}, ref) => (
  <h2
    ref={ref}
    className="name"
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    style={{color: color}}
  >
    {children}
    {"    "}
    &#x25bc;
  </h2>
));

const CustomItem = React.forwardRef(({ children, onClick }, ref) => (
  <h2
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    {"    "}
  </h2>
));

const ThemeItem = React.forwardRef(({ children, onClick }, ref) => (
  <h2
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    className="theme-item"
  >
    {children}
    {"    "}
  </h2>
));

const IconToggle = React.forwardRef(({ children, onClick }, ref) => (
  <div
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </div>
));

const estiloHover = (estilo) => {
  if (estilo === 0) return "perfildropdown-item-flink";

  if (estilo === 1) return "perfildropdown-item-algar";
  if (estilo === 2) return "perfildropdown-item-flink";

  if (estilo === 3) return "perfildropdown-item-flink";
};

const estiloLogo = (estilo) => {
  if (estilo === 0) {
    return logoFlink;
  }
  if (estilo === 1) {
    return logoAlgar;
  }
  if (estilo === 2) {
    return logoRedFlink;
  }
  if (estilo === 3) {
    return logoDarkFlink;
  }
};

const estiloIconHover = (tema, isHovered) => {
  if (isHovered === 0) return tema.colorIcon;
  if (isHovered === 1) return tema.colorHoveredIcon;
};

const estiloLogoutHover = (tema, isHovered) => {
  if (isHovered === 0) return tema.colorLogout;
  if (isHovered === 1) return tema.colorHoveredLogout;
};

function Header(props) {
  const [Hover1, setHover1] = React.useState(0);
  const [Hover2, setHover2] = React.useState(0);
  const [Hover3, setHover3] = React.useState(0);
  const [Hover4, setHover4] = React.useState(0);
  const [Hover5, setHover5] = React.useState(0);
  return (
    <div className="header">
      <div className="logo">
        <img
          alt="logo"
          className="logo-img"
          src={estiloLogo(props.temaAtual)}
          onClick={(e) => {
            if (props.displayMain.nomeItem !== "Basic") {
              props.setAtributo(
                props.displayMain.nomeItem,
                props.displayMain.nomeServico,
                "isActive",
                "false"
              );
            }
            props.modificaDisplay({
              nomeItem: "Basic",
              nomeServico: "Home",
              componenteReact: defaultMain,
              atributos: null,
            });
          }}
        />
      </div>
      <div
        className="inputPerfil"
        style={{
          backgroundColor: props.temas[props.temaAtual].backgroundColor,
        }}
      >
        <form className="input">
          <input className="search" placeholder="Pesquisar" type="text" />
        </form>
        <div className="perfil">
          <Icon
            icon="mail"
            size="6%"
            color={props.temas[props.temaAtual].textColor}
          />
          <Icon
            icon="bell"
            size="6%"
            color={props.temas[props.temaAtual].textColor}
          />
          <div className="icon icon-adjust">
            <Dropdown drop="left">
              <Dropdown.Toggle as={IconToggle} id="dropdown-custom-components">
                <Icon
                  icon="adjust"
                  size="110%"
                  color={props.temas[props.temaAtual].textColor}
                />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <div className="theme-menu">
                  {props.temas.map((tema) => {
                    return (
                      <Dropdown.Item as={ThemeItem} eventKey="1">
                        <div
                          onClick={() => props.modificaTema(tema.index)}
                          className="theme-card"
                        >
                          <div className="theme-card-img">
                            <div
                              style={{ backgroundColor: tema.backgroundColor }}
                              className="theme-card-img-split"
                            ></div>
                            <div
                              style={{ backgroundColor: tema.headerColor }}
                              className="theme-card-img-split"
                            ></div>
                            <div
                              style={{ backgroundColor: tema.textColor }}
                              className="theme-card-img-split"
                            ></div>
                          </div>
                          <h1 className="theme-card-label">{tema.nome}</h1>
                        </div>
                      </Dropdown.Item>
                    );
                  })}
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <img src={avatar} alt="foto avatar" className="avatar" />
          <Dropdown size="lg">
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" color={props.temas[props.temaAtual].textColor}>
              {props.username}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item as={CustomItem} eventKey="1">
                <div
                  className={estiloHover(props.temaAtual)}
                  onMouseEnter={() => setHover1(1)}
                  onMouseLeave={() => setHover1(0)}
                >
                  <Icon
                    icon="sync"
                    size="10%"
                    color={estiloIconHover(
                      props.temas[props.temaAtual],
                      Hover1
                    )}
                  />
                  <h2 className="perfildropdown-item-label">Serviço 1</h2>
                </div>
              </Dropdown.Item>
              <Dropdown.Item as={CustomItem} eventKey="2">
                <div
                  className={estiloHover(props.temaAtual)}
                  onMouseEnter={() => setHover2(1)}
                  onMouseLeave={() => setHover2(0)}
                >
                  <Icon
                    icon="chart"
                    size="10%"
                    color={estiloIconHover(
                      props.temas[props.temaAtual],
                      Hover2
                    )}
                  />
                  <h2 className="perfildropdown-item-label">Serviço 2</h2>
                </div>
              </Dropdown.Item>
              <Dropdown.Item as={CustomItem} eventKey="3">
                <div
                  className={estiloHover(props.temaAtual)}
                  onMouseEnter={() => setHover3(1)}
                  onMouseLeave={() => setHover3(0)}
                >
                  <Icon
                    icon="shop"
                    size="10%"
                    color={estiloIconHover(
                      props.temas[props.temaAtual],
                      Hover3
                    )}
                  />
                  <h2 className="perfildropdown-item-label">Serviço 3</h2>
                </div>
              </Dropdown.Item>
              <Dropdown.Item as={CustomItem} eventKey="4">
                <div
                  className={estiloHover(props.temaAtual)}
                  onMouseEnter={() => setHover4(1)}
                  onMouseLeave={() => setHover4(0)}
                >
                  <Icon
                    icon="cog"
                    size="10%"
                    color={estiloIconHover(
                      props.temas[props.temaAtual],
                      Hover4
                    )}
                  />
                  <h2 className="perfildropdown-item-label">Serviço 4</h2>
                </div>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item as={CustomItem} eventKey="5">
                <div
                  className={estiloHover(props.temaAtual)}
                  onClick={() => props.desloga(props.clearTime)}
                  onMouseEnter={() => setHover5(1)}
                  onMouseLeave={() => setHover5(0)}
                >
                  <Icon
                    icon="power"
                    size="10%"
                    color={estiloLogoutHover(
                      props.temas[props.temaAtual],
                      Hover5
                    )}
                  />
                  <h2 className="perfildropdown-item-label">Logout</h2>
                </div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

/* <div
className="icon"
onClick={(e) => {
  if (props.displayMain.nomeItem !== "Basic") {
    props.setAtributo(
      props.displayMain.nomeItem,
      props.displayMain.nomeServico,
      "isActive",
      "false"
    );
  }
    props.modificaDisplay({
      nomeItem: "Basic",
      nomeServico: "Theme Changer",
      componenteReact: ThemeChanger,
      atributos: null,
    });
  
}}
>
<Icon icon="adjust" size="100%" color="#696F7B" />
</div> */
