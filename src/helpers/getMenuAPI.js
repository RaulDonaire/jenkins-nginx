import store from "../redux/store";
import apiMenu from "../connections/apiMenu";
import { addItem, setUsername, desloga } from "../redux/actions";
import processaComponent from "./processaComponent";

export default async function pegandoMenuAPI(token) {
  try{
  var resultadoAPI = await apiMenu
    .get("", {
      headers: {
        Authorization: `${token}`,
        //lembrar que tiramos o Bearer
      },
    })
    

 
    console.log("Menu API", resultadoAPI.data);

    store.dispatch(setUsername(resultadoAPI.data.userName));

    resultadoAPI.data.items.forEach((item) => {
      item.servicos.forEach((servico) => {
        servico.componenteReact = processaComponent(servico.componenteReact);
      });

      store.dispatch(addItem(item));
    });
  } catch(error) {
    if (error.response) {
      // Request made and server responded
      console.log("error.response.data:", error.response.data);
      console.log("error.response.status:", error.response.status);
      console.log("error.response.headers:", error.response.headers);
      alert(
        "A conexão com o BFF retornou o erro: " + error.response.status+". Cheque o console para maiores informações."
      );
      store.dispatch(desloga());
      return;
    } else if (error.request) {
      // The request was made but no response was received
      console.log("error.request", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
  };
}

