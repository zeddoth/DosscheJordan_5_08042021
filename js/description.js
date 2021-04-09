//RECUPERATION DU PRODUIT PAR SON URL?ID=
const queryString_url_id = window.location.search;

//ON EXTRAIT JUSTE L'ID
const id = queryString_url_id.slice(4)

const results_product = document.getElementById("product_description");

let product;

//API REQUEST

const fetchProduct = async() => {
    product = await fetch("https://ab-p5-api.herokuapp.com/api/cameras/" + id).then(res => res.json());
};

const showProduct = async() => {
    await fetchProduct();

    results_product.innerHTML = (
                `
                <div class="product"> 
                    <div class="product_infos">
                        <h3 class="product-name"><strong>${product.name}</strong></h3>
                        <h2 class="product-price"><strong>${numberWithSpace(product.price /= 100)} €</strong></h2>
                        <select name="lenses" id="lens-select">
                            <option value="">--Choissisez une lentille-</option>
                        </select>
                    <p class="product-description">Description :</br>${product.description}</p>
                    </div>
                    <img class="prodcut-img" src="${product.imageUrl}" />
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

function numberWithSpace(x){
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
