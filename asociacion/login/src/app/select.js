
export const NewOpcion=(objeto,valor,texto) =>{
    let option = document.createElement("option");
    option.value = valor;
    option.text = texto;
    objeto.add(option);
    
}

export const SelectOption = (objeto,valor) =>{
    objeto.selectedIndex = valor;
}