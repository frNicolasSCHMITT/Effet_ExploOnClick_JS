// Maj + Alt + DownArrow avec une ligne séléctionnée pour la dupliquer 
const containerSlot = document.querySelector(".slot");  // const liée à la div parent du bouton HTML
const btnConfettis = document.querySelector(".btn-confettis"); //const liée au bouton HTML
const emojis = ["🍰","🍣","🍑","🍓"]; //tableau conservant les icônes utilisées

btnConfettis.addEventListener("click", fiesta)  //surveillance du click pour lancement fonction fiesta()

function fiesta(){

    if(isTweening()) return; //si fonction true alors exit. empêche de lancer si une animation est déjà en cours

    for(let i = 0; i < 50; i++){  //boucle pour incrémenter la valeur de i jusqu'à 50

        const confetti = document.createElement("div"); //fait apparaitre de nouvelles div lors de l'appel de la const

        confetti.innerText = emojis[Math.floor(Math.random() * emojis.length)];  //pour trouver un emoji au hasard dans le tableau emolis

        containerSlot.appendChild(confetti);  //fait apparaitre des div de la const confetti dans le container
    
    }

    animateConfettis();
}

function animateConfettis(){

    const TLCONF = gsap.timeline();  //appel du JS externe "greensock" linké dans l'HTML

    TLCONF  // timeline = JS pour animations

    .to(".slot div",{  // à qui s'adresse l'ordre (ici toutes les div dans la <div class=slot>)
        y: "random(-100,100)",  //se déplace sur l'axe y de telle à telle distance (vertical)
        x: "random(-100,100)",  //se déplace sur l'axe x de telle à telle distance (horizontal)
        z: "random(0,1000)",  //se déplace sur l'axe z de telle à telle distance (profondeur définie dans le CSS à 1000px où (1 = lointain et petit) et (1000 = proche et gros).)
        rotation: "random(-90,90)",  //demande une rotation aléatoire sur un axe défini
        duration: 1  //durée de l'animation en secondes
    })
    .to(".slot div", {  //Rends les éléments invisibles (mais toujours présents!)
        autoAlpha: 0,  // règle opacity et visibility à la valeur marquée (0=invisible)
        duration: 0.3,  //durée de l'animation de fading
    },"-=0.2")  // le délai pour que la commande s'exécute

    .add(() => {  
        containerSlot.innerHTML = ""; // remplace le contenu de la const containerSlot par du vide, supprimant donc les div créées précédemment
    });
}

function isTweening(){  //fonction pour check si une animation est en cours
    return gsap.isTweening(".slot div");  //renvoie true si c'est en cours d'animation, false sinon
};