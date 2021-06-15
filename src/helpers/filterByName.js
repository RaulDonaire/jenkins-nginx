export function filterByName(array, name){
    return array.map((e)=>e.nome).indexOf(name);
}
