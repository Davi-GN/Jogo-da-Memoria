const container = document.getElementById("container");
const modal = document.getElementById("modal");
const message = document.getElementById("endMessage");

const cardsData = [
    { id: 0, img: "url" }, { id: 0, img: "url" },
    { id: 1, img: "url" }, { id: 1, img: "url" },
    { id: 2, img: "url" }, { id: 2, img: "url" },
];

const initialValue = {
    tries: 8,
    endMessage: "Você Ganhou",
    modalColor: "greenyellow",
};

var flipped = [];
var counter = initialValue.tries;
var endMessage = initialValue.endMessage;
var modalColor = initialValue.modalColor;

const renderCounter = () => {
    const tries = document.getElementById("try");
    tries.innerHTML = counter;
};
renderCounter();

const renderCard = (parent, card) => {
    let node = document.createElement("div");
    node.id = card.id;
    node.classList.add("card");
    parent.appendChild(node);
};

cardsData.forEach(target => renderCard(container, target));
const cards = document.querySelectorAll(".card");


const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

cards.forEach( target => {
    target.addEventListener("click", (e) => {
        target.classList.add("flipped");
        flipped.push(e.target);
        checkStatus();
    });
});

const openModal = (open) => {
    if (open == true) {
        message.innerHTML = endMessage;
        modal.style.color = modalColor;
        modal.style.display = "flex";
        modal.style.opacity = 1;
    } else {
        modal.style.display = "none";
        modal.style.opacity = 0;
    }
};

const checkCompletion = async () => {
    const containsFlipped = document.querySelectorAll(".flipped");
    console.log(containsFlipped.length)
    if (containsFlipped.length === 6 ) {
        openModal(true);

        await delay(1000);
        location.reload();
    }

    if (counter === 0 ) {
        endMessage = "Você Perdeu!";
        modalColor = "red";

        openModal(true);

        await delay(1000);
        location.reload();
    }
};

const checkStatus = async () => {
    if (flipped.length === 2) {
        if (flipped.every(i => i.id === flipped[0].id)) {
            flipped = [];
            checkCompletion();
        } else {
            await delay(300);
            flipped.forEach(card => {
                card.classList.remove("flipped");
            })
            counter -= 1;
            renderCounter();
            flipped = [];
            checkCompletion();
        }
    }
};