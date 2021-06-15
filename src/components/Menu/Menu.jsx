import "./estilo.css";
import { connect } from "react-redux";
import { modificaDisplay, setAtributoMenu } from "../../redux/actions";
import Accordion from "react-bootstrap/Accordion";
import { filterByName } from "../../helpers/filterByName";
import Icon from "../Icon";

const mapStateToProps = (state) => {
  return {
    itensMenu: state.itensMenu,
    temaAtual: state.temaAtual,
    temas: state.temas,
    displayMain: state.displayMain,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAtributoMenu: (item, servico, atributo, valor) => {
      dispatch(setAtributoMenu(item, servico, atributo, valor));
    },
    modificaDisplay: (display) => dispatch(modificaDisplay(display)),
  };
};

const estiloAtivo = (tema) => {
  return {
    backgroundColor: tema.backgroundColorAtivo,
    color: tema.textColorAtivo,
    fontWeight: "500",
  };
};

const estiloNaoAtivo = (tema) => {
  return {
    backgroundColor: tema.backgroundColor,
    color: tema.textColor,
  };
};

const estiloIcone = (isActive, tema) => {
  if (isActive === "false") return tema.textColor;
  else return tema.textColorAtivo;
};

const verificaAtivo = (isActive, tema) => {
  if (isActive === "true") return estiloAtivo(tema);
  else return estiloNaoAtivo(tema);
};

function Menu(props) {
  return (
    <div className="menu-accordion" style={estiloNaoAtivo(props.temas[props.temaAtual])}>
      <Accordion defaultActiveKey="">
        {props.itensMenu.map((itemPai, indexPai) => {
          return (
            <ul className="menu-servicos">
              <li key={indexPai} className="menu-servicos-item">
                <Accordion.Toggle
                  className="menu-servicos-item-botao"
                  eventKey={indexPai.toString()}
                  style={estiloNaoAtivo(props.temas[props.temaAtual])}
                >
                  {itemPai.nome}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={indexPai.toString()}>
                  <ul className="menu-funcao" key={indexPai}>
                    {itemPai.servicos.map((item, index) => {
                      return (
                        <li
                          className="menu-funcao-item"
                          value={index}
                          key={index}
                          style={verificaAtivo(
                            props.itensMenu[indexPai].servicos[index].atributos[
                              filterByName(
                                props.itensMenu[indexPai].servicos[index]
                                  .atributos,
                                "isActive"
                              )
                            ].valor,
                            props.temas[props.temaAtual]
                          )}
                        >
                          <Icon
                            icon={
                              props.itensMenu[indexPai].servicos[index].icon
                            }
                            color={estiloIcone(
                              props.itensMenu[indexPai].servicos[index]
                                .atributos[
                                filterByName(
                                  props.itensMenu[indexPai].servicos[index]
                                    .atributos,
                                  "isActive"
                                )
                              ].valor,
                              props.temas[props.temaAtual]
                            )}
                            size="5%"
                          />

                          <button
                            className="menu-funcao-item-botao"
                            key={index}
                            style={verificaAtivo(
                              props.itensMenu[indexPai].servicos[index]
                                .atributos[
                                filterByName(
                                  props.itensMenu[indexPai].servicos[index]
                                    .atributos,
                                  "isActive"
                                )
                              ].valor,
                              props.temas[props.temaAtual]
                            )}
                            onClick={(e) => {
                              props.setAtributoMenu(
                                props.displayMain.nomeItem,
                                props.displayMain.nomeServico,
                                "isActive",
                                "false"
                              );
                              props.modificaDisplay({
                                nomeItem: props.itensMenu[indexPai].nome,
                                nomeServico:
                                  props.itensMenu[indexPai].servicos[index]
                                    .nome,
                                componenteReact:
                                  props.itensMenu[indexPai].servicos[index]
                                    .componenteReact,
                                atributos:
                                  props.itensMenu[indexPai].servicos[index]
                                    .atributos,
                              });
                              props.setAtributoMenu(
                                props.itensMenu[indexPai].nome,
                                props.itensMenu[indexPai].servicos[index].nome,
                                "isActive",
                                "true"
                              );
                            }}
                          >
                            {item.nome}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </Accordion.Collapse>
              </li>
            </ul>
          );
        })}
      </Accordion>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
