const container = document.getElementById("container");
const modal = document.getElementById("modal");
const message = document.getElementById("endMessage");

const cardsData = [
    { id: 1, content: "I" }, { id: 1, content: "I" },
    { id: 2, content: "II" }, { id: 2, content: "II" },
    { id: 3, content: "III" }, { id: 3, content: "III" },
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
    node.classList.add("flex");
    node.classList.add("center");
    parent.appendChild(node);
};

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    return array
};
shuffleArray(cardsData).forEach(target => renderCard(container, target));
const cards = document.querySelectorAll(".card");


const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

const romanize = (num) => {
    if (isNaN(num))
        return NaN;
    var digits = String(+num).split(""),
        key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
               "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
               "","I","II","III","IV","V","VI","VII","VIII","IX"],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}

cards.forEach( target => {
    target.addEventListener("click", (e) => {
        target.classList.add("flipped");
        target.innerHTML = romanize(target.id);
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
                card.innerHTML = "";
            })
            counter -= 1;
            renderCounter();
            flipped = [];
            checkCompletion();
        }
    }
};