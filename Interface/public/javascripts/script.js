$(function(){

})

function loadPagina(page,querieString){
    const queries = JSON.parse(querieString);
    query=''
    for (let key in queries){
        if (key != "page"){
            query += key + "=" + queries[key] + "&"
        }
    }
    window.location.href = "http://localhost:5556/acordaos?"+query+"page="+page;
}

function limparCampo(campo){

}