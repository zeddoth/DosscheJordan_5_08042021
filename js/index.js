const results = document.getElementById("results");
let cameras;

//appel de l'API
const fetchCameras = async () => {
  cameras = await fetch("http://localhost:3000/api/cameras")
    .then((res) => res.json())
    .catch(() => console.log("erreur lié à l'API"));
};

//fonction de séparation des nombres
function numberWithSpace(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

//on affiche les produits
const showCameras = async () => {
  await fetchCameras();
  results.innerHTML = cameras
    .map(
      (camera) =>
        `
                <li class="camera-item"> 
                  <a class="camera-link" href="description.html?id=${camera._id}">
                      <div class="camera-infos">
                          <h3 class="camera-name"><strong>${camera.name}</strong></h3>
                          <h2 class="camera-price"><strong>${numberWithSpace(
                            (camera.price /= 100)
                          )} €</strong></h2>
                      </div>
                    
                  </a>
                  <img class="camera-img" src="${camera.imageUrl}" alt="appareil ${camera.name}" />
                </li>
                
                `
    )
    .join("");
};
showCameras();
