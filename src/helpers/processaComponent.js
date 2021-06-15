import Receita from "../components/Receita";
import OlaMundo from "../components/OlaMundo";

export default function processaComponent(componente){
    switch(componente){
      case "Receita": return Receita;
      case "OlaMundo": return OlaMundo;
      default: return "";
    }
}