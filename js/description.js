//RECUPERATION DU PRODUIT PAR SON URL?ID=
const queryString_url_id = window.location.search;

//ON AFFICHE L'ID DANS LA CONSOLE
console.log(queryString_url_id);

//ON EXTRAIT JUSTE L'ID
const id = queryString_url_id.slice(4)
console.log(id); 

