const container = document.getElementById("container");
const counter = document.getElementById("try");
const button = document.getElementById("button");

const cardsData = [
    { id: 0, img: "url" }, { id: 0, img: "url" },
    { id: 1, img: "url" }, { id: 1, img: "url" },
    { id: 2, img: "url" }, { id: 2, img: "url" },
];

const card = (parent, card) => {
    let node = document.createElement("div");
    node.id = card.id;
    node.classList.add("card");
    parent.appendChild(node);
};

cardsData.forEach(target => card(container, target));
const cards = document.querySelectorAll(".card");


cards.forEach(() => {
    addEventListener("click", (e) => {
        console.log(e.target);
    })
});