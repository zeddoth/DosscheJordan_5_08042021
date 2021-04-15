//ON CIBLE LE LOCALSTORAGE POUR POUVOIR TRAVAILLER DESSUS
let productSavedInLs = JSON.parse(localStorage.getItem("product"));

//************AFFICHAGE DES PRODUITS DANS LE PANIER*************

//ON CIBLE LES ID OU ON VA INJECTER NOTRE CONTENU
const productInCart = document.querySelector("#cart_product");
const productQuantity = document.querySelector("#tftable_quantity");
const cart = document.querySelector(".cart");
const addProductToCart = ()  =>{
  //SI LE PANIER EST VIDE
if(productSavedInLs === null || productSavedInLs == 0){
    const emptyCart = 
    `
    <div class="cart_empty">
    <p>Le panier est vide</p>
    </div>
    `
    cart.innerHTML=emptyCart;
}
//SINON
else{
    productInCart.innerHTML = ( 
      productSavedInLs.map(
      product => (
        `
        <tr>
        <td>
          <img
            class="tftable-img"
            src="${product.photo}"
            alt="Photo de l'appareil ${product.name}"
          />
        </td>
        <td>
          <h3 class="tftable-mobile">Designation : </h3>
          ${product.name}
        </td>
        <td>
          <h3 class="tftable-mobile">Prix : </h3>
          ${product.price} €
        </td>
        <td>
          <h3 class="tftable-mobile">Quantité : </h3>
          <i class="fas fa-minus-square fa-lg" id="decrease_quantity"></i><span id="tftable_quantity"> ${product.quantity} </span><i class="fas fa-plus-square fa-lg" id="increase_quantity"></i>
        </td>
        <td>
          <h3 class="tftable-mobile">Sous-Total : </h3>
          <span id="tftable_subtotal">${product.quantity * product.price}</span> €
        </td>
        <td class="tftable-trash"><i class="far fa-times-circle fa-2x" id="delete_product"></i></td>
      </tr>
      `
        )).join("")
    )};
};

addProductToCart();
//ON CREER UNE FONCTION POUR ENVOYER AU LOCALSTORAGE
const sendLs = () => {localStorage.setItem("product", JSON.stringify(productSavedInLs))};
// ON CIBLE DES ID POUR LES EVENTLISTENER
const increaseQuantity = document.querySelectorAll("#increase_quantity");
const decreaseQuantity = document.querySelectorAll("#decrease_quantity");
const deleteProduct = document.querySelectorAll("#delete_product");
const quantityProduct = document.querySelectorAll("#tftable_quantity");
const subTotal = document.querySelectorAll("#tftable_subtotal");
// ON DECLARE LES VARIABLE POUR LES SOMMES

//ON CIBLE LES ID OU ON INJECTE NOTRE CONTENU
const totalQuantity = document.querySelector("#total_quantity");
const totalPrice = document.querySelector("#total_price");
//CALCUL DES QUANTITES TOTAL & PRIX TOTAL
const totalOfProduct = () => {
  let sumQuantity = 0;
  let sumPrice = 0;
  for (let i = 0; i < productSavedInLs.length; i++) {
    // SOMME DES QUANTITES & PRIX
    sumQuantity += productSavedInLs[i].quantity;
    sumPrice += productSavedInLs[i].price * productSavedInLs[i].quantity;
    //ON INJECTE LES SOMMES DE QUANTITES & PRIX
};
  totalPrice.innerHTML = sumPrice;
  totalQuantity.innerHTML = sumQuantity;
}
totalOfProduct();
for (let i = 0; i < productSavedInLs.length; i++) {
    //DECREMENTATION D'UN PRODUIT
    decreaseQuantity[i].addEventListener("click", ()=>{
        //SI LA QUANTITE EST SUPERIEUR A 1
        if(productSavedInLs[i].quantity > 1){
            productSavedInLs[i].quantity--;
            quantityProduct[i].innerHTML = productSavedInLs[i].quantity;
            subTotal[i].innerHTML = productSavedInLs[i].price * productSavedInLs[i].quantity;
            sendLs();
            totalOfProduct();
        }
    });
    //INCREMENTATION D'UN PRODUIT
    increaseQuantity[i].addEventListener("click", ()=>{
        productSavedInLs[i].quantity++;
        quantityProduct[i].innerHTML = productSavedInLs[i].quantity;
        subTotal[i].innerHTML = productSavedInLs[i].price * productSavedInLs[i].quantity;
        sendLs();
        totalOfProduct();
    });
    //SUPPRESION D'UN PRODUIT
    deleteProduct[i].addEventListener("click", (event)=>{
        event.preventDefault();
        let idSelect = productSavedInLs[i]._id;
        //METHODE FILTER = JE SELECTIONNE LES ELEMENTS A GARDER ET JE SUPPRIME L'ELEMENT OU LE BOUTON SUPPR CE SITUE
        productSavedInLs = productSavedInLs.filter( el => el._id !== productSavedInLs[i]._id);
        sendLs();
        location.reload();
    });
};
// SI LE PANIER EST VIDE (TABLEAU(ARRAY)) ALORS ONT SUPPRIME LE LOCALSTORAGE
if(productSavedInLs == 0){
    localStorage.clear();
}