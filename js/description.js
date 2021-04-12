//RECUPERATION DU PRODUIT PAR SON URL?ID=
const queryString_url_id = window.location.search;

//ON EXTRAIT JUSTE L'ID
const id = queryString_url_id.slice(4);
const results_product = document.getElementById("product_description");
let product;

//APPEL DE L'API
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
                        <select id="lens-select" name="lens-select">
                        </select>
                </form>
                <p class="product-description">Description :</br>${product.description}</p>
            </div>
            <div class="product_img">
                <img class="product_img_container" src="${product.imageUrl}" />
            </div>
            <button type="submit" id="add_to_cart" name="add_to_cart">Ajouter au panier</button>

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
};

//--------------------------------------GESTION DU PANIER--------------------------------------
//*ls = localStorage
//RECUPERATION DES DONNEES SELECTIONEES PAR L'UTILISATEUR & ENVOIE AU PANIER
// & GESTION DU LOCALSTORAGE

const cart = async () => {
    await showProduct();
    const idForm = document.querySelector("#lens-select");
    console.log(idForm);
    const addToCartBtn = document.querySelector("#add_to_cart");
    console.log(addToCartBtn);
    // QUAND JE CLIQUE SUR LE BOUTON "AJOUTER AU PANIER"
    addToCartBtn.addEventListener("click", (event)=>{
        event.preventDefault();
        const choixForm = idForm.value;
        console.log(choixForm);
        //CREATION DE L'OBJET POUR LE LOCALSTORAGE
        let optionsProduct = {
            name: product.name,
            _id: product._id,
            lenses: choixForm,
            quantity: 1,
            price: product.price
        }
        console.log(optionsProduct);
        //CREATION DU POPUP DE CONFIRMATION
        const popupConfirm = () =>{
            if(window.confirm(`${product.name} à été ajouter au panier avec l'option : ${product.lenses[choixForm]} , Vous pouvez consulter votre panier en appuyant sur "OK" sinon revenez à l'accueil avec "ANNULER"`)){
                window.location.href = "cart.html";
            }else{
                window.location.href = "index.html";
            }
        }
        let productSavedInLs = JSON.parse(localStorage.getItem("product"));
        const addProductInLs = () =>{
            //AJOUT DANS LE TABLEAU "optionsProduct" LES VALEURS CHOISI PAR L'UTILISATEUR
            productSavedInLs.push(optionsProduct);
            //CONVERTIR LES DONNEES AU FORMAT JSON QUI SONT DANS LE LOCALSTORAGE EN JAVASCRIPT
            localStorage.setItem("product", JSON.stringify(productSavedInLs));
        }
        //SI DES PRODUITS SONT DEJA PRESENT DANS LE PANIER(ls)
        if(productSavedInLs){
            addProductInLs();
            popupConfirm();
        }
        //SINON SI AUCUN PRODUIT EST DANS LE PANIER(ls)
        else{
            productSavedInLs = [];
            addProductInLs();
            popupConfirm();
        };
    });
        

}
cart();




const lsCart = async () => {
    await cart();

}
lsCart();
