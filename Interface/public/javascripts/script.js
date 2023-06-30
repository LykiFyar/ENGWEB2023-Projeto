$(function(){

})

function loadPagina(page,pageDirection,querieString){
    const queries = JSON.parse(querieString);
    query=''
    for (let key in queries){
        if (key != "page" && key != "pageDirection"){
            query += key + "=" + queries[key] + "&"
        }
    }
    window.location.href = "http://localhost:5556/acordaos?"+query+"page="+page+"&pageDirection="+pageDirection;
}

function favoritos(processos){
    let favoritos_list = []
    processos.forEach(processo => {
        if (processo.fav) favoritos_list.push(processo)
    });
    return favoritos_list;
}

function removerPreferido(processo){
    processo['fav'] = false;
}

function adicionarPreferido(processo){
    processo['fav'] = true;
}

