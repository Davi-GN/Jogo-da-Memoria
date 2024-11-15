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

var counter = initialValue.tries;

const renderTry = () => {
    const tries = document.getElementById("try");
    tries.innerHTML = counter;
};
renderTry();

const card = (parent, card) => {
    let node = document.createElement("div");
    node.id = card.id;
    node.classList.add("card");
    parent.appendChild(node);
};

cardsData.forEach(target => card(container, target));
const cards = document.querySelectorAll(".card");


cards.forEach( target => {
    target.addEventListener("click", (e) => {
        target.style.background = "#fafa";
    });
});