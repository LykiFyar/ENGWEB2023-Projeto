$(function(){

})

function loadPagina(page,pageDirection,querieString){
    const queries = JSON.parse(querieString);
    query=''
    for (let key in queries){
        if (key != "page" && key != "nextPage"){
            query += key + "=" + queries[key] + "&"
        }
    }
    window.location.href = "http://localhost:5556/acordaos?"+query+"page="+page+"&"+pageDirection;
}

