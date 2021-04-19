//on cible le "localStorage" pour pouvoir travailler avec
let productSavedInLs = JSON.parse(localStorage.getItem("product"));
//on cible l'ID ou on va injecter notre contenue
const totalQuantitySpan = document.querySelector("#cart_total_quantity");
const cartBubble = document.querySelector(".cart_bubble");

const totalOfProduct = () => {
  //on declare les variables pour les sommes
  let sumQuantity = 0;
  if (productSavedInLs !== null) {
    for (let i = 0; i < productSavedInLs.length; i++) {
      //somme des quantités & prix
      sumQuantity += productSavedInLs[i].quantity;
    }
  }
  //si la quantité est égale à 0 alors la bulle ne s'affiche pas
  if (sumQuantity === 0) {
    cartBubble.style.display = "none";
  }
  //on injecte la somme de quantités
  totalQuantitySpan.innerHTML = sumQuantity;
};
totalOfProduct();
