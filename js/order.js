const orderConfirmed = document.querySelector("#order");
const orderSavedInLs = JSON.parse(localStorage.getItem("order"));
console.log(orderSavedInLs.contact.firstName);

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
    </div>

    `;
};
showOrder();
