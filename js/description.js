//RECUPERATION DU PRODUIT PAR SON URL?ID=
const queryString_url_id = window.location.search;

//ON EXTRAIT JUSTE L'ID
const id = queryString_url_id.slice(4)

const results_product = document.getElementById("product_description");

let product;

//API REQUEST

const fetchProduct = async() => {
    product = await fetch("http://localhost:3000/api/cameras/" + id).then(res => res.json());
};

//ON AFFICHE LE PRODUIT

const showProduct = async() => {
    await fetchProduct();

    results_product.innerHTML = (
                `
                <div class="product"> 
                    <div class="product_infos">
                        <h3 class="product_name"><strong>${product.name}</strong></h3>
                        <h2 class="product_price"><strong>${numberWithSpace(product.price /= 100)} €</strong></h2>
                        <form>
                            <label for="lens-select">Lentilles :</label>
                                <select name="lens-select" id="lens-select">
                                    <option>--Choissisez une lentille-</option>
                                </select>
                        </form>
                        <p class="product-description">Description :</br>${product.description}</p>
                    </div>
                    <div class="product_img">
                        <img class="product_img_container" src="${product.imageUrl}" />
                    </div>
                    <button id="add_to_cart">Ajouter au panier</button>
                    
                </div>
                `
                
    )
    for(i=0 ; i < product.lenses.length ; i++){
      document.getElementById("lens-select").innerHTML += (
        `<option value="${[i]}">${product.lenses[i]}</option>`
    )}; 
};

showProduct();

//FONCTION DE SEPARATION DES NOMBRES

function numberWithSpace(x){
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}


//GESTION DU PANIER

//RECUPERATION DES DONNEES SELECTIONEES PAR L'UTILISATEUR & ENVOIE DU PANIER

//SELECTION DE L'ID DU FORMULAIRE (OPTION)

const idForm = document.getElementById("lens-select");
console.log(idForm);


