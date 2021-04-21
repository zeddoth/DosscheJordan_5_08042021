//fonction d'appel de l'API pour afficher le produit par son ID
const fetchProduct = async () => {
  //récuperation du produit par son "URL?ID="
  const urlParams = new URLSearchParams(window.location.search);
  //on extrait juste l'ID
  const id = urlParams.get("id");
  product = await fetch("http://localhost:3000/api/cameras/" + id)
    .then((res) => res.json())
    .catch(() => console.log("erreur lié à l'API"));
};
//fonction régulière de séparation des nombres
const numberWithSpace = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};
//on affiche le produit
const showProduct = async () => {
  const results_product = document.getElementById("product_description");
  await fetchProduct();
  results_product.innerHTML = `
        <div class="product_img">
          <img class="product_img_container" src="${product.imageUrl}" alt="appareil ${
    product.name
  }"/>
        </div>
        <div class="product"> 
        <div class="product_infos">
                <h1 class="product_name"><strong>${product.name}</strong></h1>
                <h2 class="product_price"><strong>${numberWithSpace(
                  (product.price /= 100)
                )} €</strong></h2>
                <form>
                    <label for="lens-select"><p>Lentilles :</p></label>
                        <select id="lens-select" name="lens-select">
                        </select>
                </form>
                <p class="product-description">Description : </p>
                <p>${product.description}</p>
            </div>
            <button type="submit" id="add_to_cart" name="add_to_cart"><h3>Ajouter au panier</h3></button>
            <div id="add_confirm">
              <h3>Votre produit a été ajouté au panier</h3>
            </div>
        </div>
                `;
  for (i = 0; i < product.lenses.length; i++) {
    document.getElementById("lens-select").innerHTML += `<option value="${[i]}">${
      product.lenses[i]
    }</option>`;
  }
  document.title += ` ${product.name}`;
};
//--------------------------------------gestion du panier--------------------------------------
//*ls = localStorage
//récuperation des données selectionner par l'utilisateur & envoie au panier
//---------------------------------------------------------------------------------------------
//fonction pour gerer l'animation & la bulle du panier
const popAddedToCart = () => {
  const cartBubble = document.querySelector(".cart_bubble");
  const addedToCart = document.querySelector("#add_confirm");
  //gestion de la bubble quantity du panier
  let sumQuantity = 0;
  if (productSavedInLs !== null) {
    for (let i = 0; i < productSavedInLs.length; i++) {
      //somme des quantités & prix
      sumQuantity += productSavedInLs[i].quantity;
    }
  }
  //ajout de la nouvelle quantité dans la bulle du panier ( affichage de la bulle & ont defini la quantité de la bulle)
  cartBubble.style.display = "flex";
  totalQuantitySpan.innerHTML = sumQuantity;
  //gestion de l'animation "Ajouté au panier"
  addedToCart.classList.remove("run_pop");
  void addedToCart.offsetWidth;
  addedToCart.classList.add("run_pop");
};
//fonction d'ajout au panier
const addProductInLs = () => {
  const idForm = document.querySelector("#lens-select");
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
//fonction du panier
const cart = async () => {
  await showProduct();
  //on cible l'id de notre bouton "ajouter au panier"
  const addToCartBtn = document.querySelector("#add_to_cart");
  //quand je clique sur le bouton "ajouter au panier"
  addToCartBtn.addEventListener("click", (event) => {
    event.preventDefault();
    //si les produits sont déja présent dans le panier
    if (productSavedInLs) {
      addProductInLs();
    }
    //sinon si aucun produit dans le panier on créer un tableau
    else {
      productSavedInLs = [];
      addProductInLs();
    }
    //création du popup de confirmation d'ajout au panier
    popAddedToCart();
  });
};
cart();
