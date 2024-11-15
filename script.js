const container = document.getElementById("container");
const button = document.getElementById("button");

const cardsData = [
    { id: 0, img: "url" }, { id: 0, img: "url" },
    { id: 1, img: "url" }, { id: 1, img: "url" },
    { id: 2, img: "url" }, { id: 2, img: "url" },
];

const initialValue = {
    tries: 8
};

var flipped = [];
var counter = initialValue.tries;

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
    target.addEventListener("click", async (e) => {
        target.classList.add("flipped");
        flipped.push(e.target);

        await delay(1000);
        checkStatus();
    });
});

const checkStatus = () => {
    if (flipped.length === 2) {
        if (flipped.every(i => i.id === flipped[0].id)) {
            console.log(flipped)
            console.log("sucesso");
            flipped = [];
        } else {
            console.log(flipped);
            flipped.forEach(card => {
                card.classList.remove("flipped");
            })
            counter -= 1;
            renderCounter();
            flipped = [];
        }
    }
};