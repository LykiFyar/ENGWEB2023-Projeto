$(function(){

})

function loadProcesso(id){
  window.location.href = "http://localhost:5556/acordaos/"+id
}

function loadSugestao(id){
  window.location.href = "http://localhost:5556/sugestoes/"+id
}

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

function adicionarDescritor() {
  var novoDescritor = document.getElementById('novoDescritor').value.trim();
  if (novoDescritor) {
    var textarea = document.getElementsByName('Descritores')[0];
    var descritores = textarea.value.trim();
    if (descritores) {
      descritores += '\n' + novoDescritor;
    } else {
      descritores = novoDescritor;
    }
    textarea.value = descritores;
    document.getElementById('novoDescritor').value = '';
  }
}


function removerDescritor() {
  const textarea = document.querySelector('textarea[name="Descritores"]');
  const valores = textarea.value.split("\n");
  const indice = prompt("Digite o índice do valor a ser removido:");
  if (indice && indice >= 0 && indice < valores.length) {
    valores.splice(indice, 1);
    textarea.value = valores.join("\n");
  }
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