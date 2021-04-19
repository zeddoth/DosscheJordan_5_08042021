//récuperation du produit par son "URL?ID="
const urlParams = new URLSearchParams(window.location.search);
//on extrait juste l'ID
const id = urlParams.get("id");
const results_product = document.getElementById("product_description");
let product;

//appel de l'API
const fetchProduct = async () => {
  product = await fetch("http://localhost:3000/api/cameras/" + id).then((res) => res.json());
};
//fonction de séparation des nombres
function numberWithSpace(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

//on affiche le produit
const showProduct = async () => {
  await fetchProduct();
  results_product.innerHTML = `
        <div class="product"> 
        <div class="product_infos">
                <h3 class="product_name"><strong>${product.name}</strong></h3>
                <h2 class="product_price"><strong>${numberWithSpace(
                  (product.price /= 100)
                )} €</strong></h2>
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
                `;
  for (i = 0; i < product.lenses.length; i++) {
    document.getElementById("lens-select").innerHTML += `<option value="${[i]}">${
      product.lenses[i]
    }</option>`;
  }
};
showProduct();
//--------------------------------------gestion du panier--------------------------------------
//*ls = localStorage
//récuperation des données selectionner par l'utilisateur & envoie au panier
//gestion du "localStorage"

const cart = async () => {
  await showProduct();
  const idForm = document.querySelector("#lens-select");
  const addToCartBtn = document.querySelector("#add_to_cart");
  const cartBubble = document.querySelector(".cart_bubble");
  //quand je clique sur le bouton "ajouter au panier"
  addToCartBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const choixForm = idForm.value;
    //création de l'objet pour le "localStorage"
    let optionsProduct = {
      name: product.name,
      _id: product._id,
      lenses: choixForm,
      quantity: 1,
      price: product.price,
      photo: product.imageUrl,
    };
    //création du popup de confirmation d'ajout au panier
    // const popupConfirm = () => {

    // };
    let productSavedInLs = JSON.parse(localStorage.getItem("product"));
    const addProductInLs = () => {
      let newProduct = 1;
      for (let i = 0; i < productSavedInLs.length; i++) {
        if (productSavedInLs[i]._id === optionsProduct._id) {
          productSavedInLs[i].quantity++;
          newProduct = 0;
        }
      }
      //ajoute dans le tableau "optionsProduct" les valeurs choisi par l'utilisateur
      if (newProduct === 1) {
        productSavedInLs.push(optionsProduct);
      }
      //convertir les données au format "JSON" qui sont dans le "localStorage" en Javascript
      localStorage.setItem("product", JSON.stringify(productSavedInLs));
    };
    //si les produits sont déja présent dans le panier
    if (productSavedInLs) {
      addProductInLs();
      // popupConfirm();
    }
    //sinon si aucun produit dans le panier on créer un tableau
    else {
      productSavedInLs = [];
      addProductInLs();
      // popupConfirm();
    }
    //gestion de la bubble quantity du panier
    let sumQuantity = 0;
    if (productSavedInLs !== null) {
      for (let i = 0; i < productSavedInLs.length; i++) {
        //somme des quantités & prix
        sumQuantity += productSavedInLs[i].quantity;
      }
    }
    cartBubble.style.display = "block";
    totalQuantitySpan.innerHTML = sumQuantity;
  });
};
cart();
