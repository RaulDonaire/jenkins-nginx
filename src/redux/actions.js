import * as actionsTypes from "./actionTypes";

export function addItem(itemAdicionado) {
  return {
    type: actionsTypes.ADD_ITEM_MENU,
    payload: {
      nome: itemAdicionado.nome,
      servicos: itemAdicionado.servicos,
    },
  };
}

export function modificaDisplay(display) {
  return {
    type: actionsTypes.MODIFICA_DISPLAY,
    payload: {
      display: display,
    },
  };
}

export function modificaTema(tema){
  return {
    type: actionsTypes.MODIFICA_TEMA,
    payload: {
      tema: tema,
    }
  }
}


export function setAtributo(itemModificado, servicoModificado, atributoModificado, valorModificado){
  return{
    type: actionsTypes.SET_ATRIBUTO,
    payload:{
      item: itemModificado,
      servico: servicoModificado,
      atributo: atributoModificado,
      valor: valorModificado,
    }
  }
}

export function setAtributoMenu(itemModificado, servicoModificado, atributoModificado, valorModificado){
  return{
    type: actionsTypes.SET_ATRIBUTO_MENU,
    payload:{
      item: itemModificado,
      servico: servicoModificado,
      atributo: atributoModificado,
      valor: valorModificado,
    }
  }
}

export function autentica(token){
  return{
    type: actionsTypes.AUTENTICA,
    payload:{
      token: token,
    }
  }
}

export function desloga(){
  return{
    type: actionsTypes.AUTENTICA,
    payload:{
      token: null,
    }
  }
}

export function setUsername(name){
  return{
    type: actionsTypes.SET_USERNAME,
    payload:{
      username: name,
    }
  }
}
