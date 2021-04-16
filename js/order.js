//on cible l'id ou ont veut injecter notre contenu
const orderConfirmed = document.querySelector("#order");
//on cible le "localStorage" pour pouvoir travailler avec
const orderSavedInLs = JSON.parse(localStorage.getItem("order"));
//on creer une fonction pour afficher le récap de notre commande et du renvoie de l'API
const showOrder = () => {
  orderConfirmed.innerHTML = `
    <div class="order_completed">
        <h2>Merci ${orderSavedInLs.contact.firstName} pour votre commande et votre confiance</h2>
        <p>
        Vous recevrez prochainement une facture par mail
        <br>
        <br>
        Votre n° de commande : <h4>${orderSavedInLs.orderId}</h4>
        </p>
        <div class="order_completed_img">
            <img src="./imgs/package.svg" alt="carton avec une main">
        </div>
        <a class="order_completed_btn" href="./index.html">Retourner à l'acceuil</a>
    </div>

    `;
};
//on affiche la commande du client
showOrder();
//on cible l'id de notre lien pour pouvoir vider le localstorage au retour à l'acceuil
const orderBtn = document.querySelector(".order_completed_btn");
//on écoute au click sur le bouton "Retourner à l'acceuil"
orderBtn.addEventListener("click", () => {
  localStorage.clear();
});
