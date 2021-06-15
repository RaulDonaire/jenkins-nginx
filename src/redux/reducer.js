import defaultMain from "../components/defaultMain";
import * as actionsTypes from "./actionTypes";

const initialState = {
  itensMenu: [],
  username: "Usuário",
  displayMain: {
    nomeItem: "Default",
    nomeServico: "Home",
    componenteReact: defaultMain,
    atributos: [],
  },
  temas: [
    {
      index: 0,
      nome: "Flink",
      backgroundColor: "rgb(255, 255, 255)",
      textColor: "rgb(29, 45, 71)",
      backgroundColorAtivo: "rgb(231, 232, 234)",
      textColorAtivo: "rgb(29, 45, 71)",
      colorIcon: "#696F7B",
      colorHoveredIcon: "#696F7B",
      colorLogout: "rgb(255, 0, 0)",
      colorHoveredLogout: "rgb(255, 0, 0)",
      headerColor: "rgb(231, 232, 236)",
      headerTextColor: "rgb(29, 45, 71)",
    },
    {
      index: 1,
      nome: "Algar",
      backgroundColor: "rgb(255, 255, 255)",
      textColor: "rgb(0,107,177)",
      backgroundColorAtivo: "rgb(0,107,177)",
      textColorAtivo: "rgb(255, 255, 255)",
      colorIcon: "#696F7B",
      colorHoveredIcon: "#FFFFFF",
      colorLogout: "rgb(255, 0, 0)",
      colorHoveredLogout: "rgb(255, 255, 255)",
      headerColor: "rgb(231, 232, 236)",
      headerTextColor: "rgb(0,107,177)",
    },
    {
      index: 2,
      nome: "Red",
      backgroundColor: "rgb(255, 255, 255)",
      textColor: "rgb(140, 11, 16)",
      backgroundColorAtivo: "rgb(140, 11, 16)",
      textColorAtivo: "rgb(255, 255, 255)",
      colorIcon: "#8C0B10",
      colorHoveredIcon: "#8C0B10",
      colorLogout: "rgb(255, 0, 0)",
      colorHoveredLogout: "rgb(255, 0, 0)",
      headerColor: "rgb(140, 11, 16)",
      headerTextColor: "rgb(255, 255, 255)",
    },
    {
      index: 3,
      nome: "Black",
      backgroundColor: "rgb(20, 20, 20)",
      textColor: "rgb(255, 255, 255)",
      backgroundColorAtivo: "rgb(55, 55, 55)",
      textColorAtivo: "rgb(255, 255, 255)",
      colorIcon: "#0A0A0A",
      colorHoveredIcon: "#0A0A0A",
      colorLogout: "rgb(255, 0, 0)",
      colorHoveredLogout: "rgb(255, 0, 0)",
      headerColor: "rgb(55, 55, 55)",
      headerTextColor: "rgb(255, 255, 255)"
    },
  ],
  temaAtual: 0,
  token: null,
};

export default function reducer(state = initialState, action) {
  if (action.type === actionsTypes.ADD_ITEM_MENU) {
    return {
      ...state,
      itensMenu: [
        ...state.itensMenu,
        {
          nome: action.payload.nome,
          servicos: action.payload.servicos,
        },
      ],
    };
  } else if (action.type === actionsTypes.MODIFICA_DISPLAY) {
    return {
      ...state,
      displayMain: {
        nomeItem: action.payload.display.nomeItem,
        nomeServico: action.payload.display.nomeServico,
        componenteReact: action.payload.display.componenteReact,
        atributos: action.payload.display.atributos,
      },
    };
  } else if (action.type === actionsTypes.MODIFICA_TEMA) {
    return {
      ...state,
      temaAtual: action.payload.tema,
    };
  } else if (action.type === actionsTypes.SET_ATRIBUTO) {
    return {
      ...state,
      itensMenu: state.itensMenu.map((item) => {
        if (item.nome === action.payload.item) {
          item.servicos.map((servico) => {
            if (servico.nome === action.payload.servico) {
              servico.atributos.map((att) => {
                if (att.nome === action.payload.atributo) {
                  att.valor = action.payload.valor;
                }
                return att;
              });
            }
            return servico;
          });
        }
        return item;
      }),
      displayMain: {
        ...state.displayMain,
        atributos: state.displayMain.atributos.map((atributo) => {
          if (atributo.nome === action.payload.atributo) {
            atributo.valor = action.payload.valor;
          }
          return atributo;
        }),
      },
    };
  } else if (action.type === actionsTypes.SET_ATRIBUTO_MENU) {
    return {
      ...state,
      itensMenu: state.itensMenu.map((item) => {
        if (item.nome === action.payload.item) {
          item.servicos.map((servico) => {
            if (servico.nome === action.payload.servico) {
              servico.atributos.map((att) => {
                if (att.nome === action.payload.atributo) {
                  att.valor = action.payload.valor;
                }
                return att;
              });
            }
            return servico;
          });
        }
        return item;
      }),
    };
  } else if (action.type === actionsTypes.AUTENTICA) {
    return {
      ...state,
      token: action.payload.token,
      itensMenu: [],
      displayMain: {
        nomeItem: "Default",
        nomeServico: "Home",
        componenteReact: defaultMain,
        atributos: [],
      },
    };
  } else if (action.type === actionsTypes.SET_USERNAME) {
    return {
      ...state,
      username: action.payload.username,
    };
  } else return state;
}
