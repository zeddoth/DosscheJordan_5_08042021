//on cible le "localStorage" pour pouvoir travailler avec
let productSavedInLs = JSON.parse(localStorage.getItem("product"));

//************affichage des produits dans le panier*************

//fonction régulière pour l'espacement des nombres
function numberWithSpace(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

//on cible les id ou on va injecter notre contenu
const productInCart = document.querySelector("#cart_product");
const productQuantity = document.querySelector("#tftable_quantity");
const cart = document.querySelector(".cart");
const addProductToCart = () => {
  //si le panier est vide
  if (productSavedInLs === null || productSavedInLs == 0) {
    const emptyCart = `
    <div class="cart_empty">
    <h2>Le panier est vide</h2>
    <img src="./imgs/broke.svg" alt="quelqu'un au poche vide">
    </div>
    `;
    cart.innerHTML = emptyCart;
  }
  //sinon
  else {
    productInCart.innerHTML = productSavedInLs
      .map(
        (product) =>
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
          ${numberWithSpace(product.price)} €
        </td>
        <td>
          <h3 class="tftable-mobile">Quantité : </h3>
          <i class="fas fa-minus-square fa-lg" id="decrease_quantity" title="Diminuer la quantité"></i><span id="tftable_quantity"> ${
            product.quantity
          } </span><i class="fas fa-plus-square fa-lg" id="increase_quantity" title="Augmenter la quantité"></i>
        </td>
        <td>
          <h3 class="tftable-mobile">Sous-Total : </h3>
          <span id="tftable_subtotal">${numberWithSpace(product.quantity * product.price)}</span> €
        </td>
        <td class="tftable-trash"><i class="far fa-times-circle fa-2x" id="delete_product" title="Supprimer l'article"></i></td>
      </tr>
      `
      )
      .join("");
  }
};
addProductToCart();
//on créer une fonction pour envoyer au "localStorage"
const sendLs = () => {
  localStorage.setItem("product", JSON.stringify(productSavedInLs));
};
//on cible les id pour les "EventListener"
const increaseQuantity = document.querySelectorAll("#increase_quantity");
const decreaseQuantity = document.querySelectorAll("#decrease_quantity");
const deleteProduct = document.querySelectorAll("#delete_product");
const deleteProducts = document.querySelector("#delete_products");
const quantityProduct = document.querySelectorAll("#tftable_quantity");
const subTotal = document.querySelectorAll("#tftable_subtotal");
//on cible les id ou ont veut injecter notre prix total & quantité totale
const totalQuantity = document.querySelectorAll("#total_quantity");
const totalPrice = document.querySelectorAll(".total_price");
const totalQuantitySpan = document.querySelector("#cart_total_quantity");
const cartBubble = document.querySelector(".cart_bubble");
//fonction de calcul de quantité & prix total
const totalOfProduct = () => {
  //on declar les variables pour les sommes
  let sumQuantity = 0;
  let sumPrice = 0;
  if (productSavedInLs !== null) {
    for (let i = 0; i < productSavedInLs.length; i++) {
      //somme des quantités & prix
      sumQuantity += productSavedInLs[i].quantity;
      sumPrice += productSavedInLs[i].price * productSavedInLs[i].quantity;
      //on injecte les sommes de quantités & prix
    }
  }
  for (let i = 0; i < totalPrice.length && i < totalQuantity.length; i++) {
    totalPrice[i].innerHTML = numberWithSpace(sumPrice);
    totalQuantity[i].innerHTML = sumQuantity;
  }
  if (sumQuantity === 0) {
    cartBubble.style.display = "none";
  }
  totalQuantitySpan.innerHTML = sumQuantity;
};
totalOfProduct();
if (productSavedInLs) {
  for (let i = 0; i < productSavedInLs.length; i++) {
    //décrementation d'un produit
    decreaseQuantity[i].addEventListener("click", () => {
      //si la quantité est supérieur à 1 seulement
      if (productSavedInLs[i].quantity > 1) {
        productSavedInLs[i].quantity--;
        quantityProduct[i].innerHTML = productSavedInLs[i].quantity;
        subTotal[i].innerHTML = numberWithSpace(
          productSavedInLs[i].price * productSavedInLs[i].quantity
        );
        sendLs();
        totalOfProduct();
      }
    });
    //incrémentation d'un produit
    increaseQuantity[i].addEventListener("click", () => {
      productSavedInLs[i].quantity++;
      quantityProduct[i].innerHTML = productSavedInLs[i].quantity;
      subTotal[i].innerHTML = numberWithSpace(
        productSavedInLs[i].price * productSavedInLs[i].quantity
      );
      sendLs();
      totalOfProduct();
    });
    //suppresion d'un produit
    deleteProduct[i].addEventListener("click", (event) => {
      event.preventDefault();
      let idSelect = productSavedInLs[i]._id;
      //méthode "filter" = je selectionne les élements à garder et je supprime l'élement ou le bouton de suprresion ce situe
      productSavedInLs = productSavedInLs.filter((el) => el._id !== productSavedInLs[i]._id);
      sendLs();
      location.reload();
    });
  }
}
//si le panier est vide ("array") alors je clear le "localStorage"
if (productSavedInLs == 0) {
  localStorage.clear();
}
//"EventListener" pour supprimer l'intégralité du panier et "refresh" la page web
if (productSavedInLs) {
  deleteProducts.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
  });
}
//***********on envoie les informations a l'API avec la méthode "POST"***********
//on cible l'ID de notre bouton "passez la commande"
const confirmOrder = document.querySelector("#confirm_order");
//on inclue nos expressions régulière pour verifier les champs du formulaires
const checkNumber = /[0-9]/;
const checkSpecialCharacter = /[§!@#$%^&().?":{}|<>]/;
//on recuperes les ids des produits dans le panier qu'on injecte dans notre tableau
let products = [];

if (productSavedInLs !== null) {
  for (let i = 0; i < productSavedInLs.length; i++) {
    products.push(productSavedInLs[i]._id);
  }
}
//on verifie que les données envoyé dans le tableau sont correct
// console.log(productSavedInLs);
// console.log(products);
if (confirmOrder !== null) {
  confirmOrder.addEventListener("click", () => {
    //on cible les ID pour recuperer les values des input
    const firstNameForm = document.querySelector("#firstname").value;
    const lastNameForm = document.querySelector("#lastname").value;
    const addressForm = document.querySelector("#address").value;
    const cityForm = document.querySelector("#city").value;
    const emailForm = document.querySelector("#email").value;
    const atPosition = emailForm.indexOf("@");
    const dotPosition = emailForm.lastIndexOf(".");
    //on verifie les "values" des input afin qu'ils sois validés avant l’envoi des données au serveur.
    //j'execute la suite du code seulement SI les champs ne sont pas vide
    if (
      firstNameForm === "" ||
      lastNameForm === "" ||
      addressForm === "" ||
      cityForm === "" ||
      emailForm === ""
    ) {
      alert("Veuillez verifiez que les champs du formulaire ne sont pas vides");
      return false;
    }
    //j'execute la suite du code seulement si les champs ne sont pas des nombres
    if (
      !isNaN(firstNameForm) ||
      !isNaN(lastNameForm) ||
      !isNaN(cityForm) ||
      !isNaN(addressForm) ||
      !isNaN(emailForm)
    ) {
      alert("Les champs (Prénom,Nom ou Ville) ne peuvent pas être des nombres");
      return false;
    }
    //j'execute la suite du code seulement si les champs "Prenom","Nom" & "Ville" ne contiennent pas de caractères spéciaux ou nombres
    if (
      firstNameForm.match(checkSpecialCharacter) ||
      lastNameForm.match(checkSpecialCharacter) ||
      cityForm.match(checkSpecialCharacter) ||
      firstNameForm.match(checkNumber) ||
      lastNameForm.match(checkNumber) ||
      cityForm.match(checkNumber)
    ) {
      alert(
        "Les champs (Prénom,Nom ou Ville) ne peuvent pas contenir de caractères spéciaux ni de nombres"
      );
      return false;
    }
    //j'execute la suite du code seulement SI l'email est est correctement saisi , comme "exemple@gmail.com"
    if (atPosition < 1 || dotPosition < atPosition + 2 || dotPosition + 2 >= emailForm.length) {
      alert("Entrer une adresse mail valide");
      return false;
    }
    //on recupere les information dans un objet
    const contact = {
      firstName: firstNameForm,
      lastName: lastNameForm,
      address: addressForm,
      city: cityForm,
      email: emailForm,
    };
    //j'envoie les données à l'API avec la méthode "POST"
    const postAPI = () => {
      fetch("http://localhost:3000/api/cameras/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contact, products }),
      })
        .then((response) => response.json())
        .then((order) => {
          //on verifie le contenue le commande(order)
          // console.log(order);
          localStorage.setItem("order", JSON.stringify(order));
          window.location.pathname = "./client/order.html";
        })
        .catch(() => console.log("erreur lié à l'API"));
    };
    postAPI();
    localStorage.clear();
  });
}
