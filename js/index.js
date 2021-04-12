const results = document.getElementById("results");
let cameras;

//APPEL DE L'API
const fetchCameras = async() => {
    cameras = await fetch("http://localhost:3000/api/cameras").then(res => res.json());
};

//ON AFFICHE LES PRODUITS
const showCameras = async() => {
    await fetchCameras();
    results.innerHTML = (

        cameras
            .map(camera => (

                `
                <a class="camera-link" href="description.html?id=${camera._id}">
                <li class="camera-item"> 
                    <div class="camera-infos">
                        <h3 class="camera-name"><strong>${camera.name}</strong></h3>
                        <h2 class="camera-price"><strong>${numberWithSpace(camera.price /= 100)} €</strong></h2>
                    </div>
                    <img class="camera-img" src="${camera.imageUrl}" />
                </li>
                </a>
                `
            )).join("")
    );
};
showCameras();

//FONCTION DE SEPARATION DES NOMBRES
function numberWithSpace(x){
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
