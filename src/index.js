// Cards Array
const cardArray = [
    { name: "cube", img: "./src/assets/img/cube.png" },
    { name: "diskette", img: "./src/assets/img/diskette.png" },
    { name: "music", img: "./src/assets/img/music.png" },
    { name: "tv", img: "./src/assets/img/tv.png" },
    { name: "cassette", img: "./src/assets/img/cassette.png" },
    { name: "roller", img: "./src/assets/img/roller.png" },
    { name: "cube", img: "./src/assets/img/cube.png" },
    { name: "diskette", img: "./src/assets/img/diskette.png" },
    { name: "music", img: "./src/assets/img/music.png" },
    { name: "tv", img: "./src/assets/img/tv.png" },
    { name: "cassette", img: "./src/assets/img/cassette.png" },
    { name: "roller", img: "./src/assets/img/roller.png" },
];

// Variables
cardArray.sort(() => 0.5 - Math.random());
const grid = document.querySelector(".grid");
const resultDisplay = document.querySelector("#result");
const subtitle = document.querySelector(".subtitle");
const restart = document.querySelector(".restart");
let cardsChosen = [];
let cardsChosenIds = [];
let cardsWon = [];

document.addEventListener("DOMContentLoaded", () => {
    
    const createBoard = () => {
        for (let i = 0; i < cardArray.length; i++) {
          let card = document.createElement("img");
          handleAttribute(card, "./src/assets/img/blank.png");
          card.setAttribute("data-id", i);
          card.addEventListener("click", () => flipCard(i, card));
          grid.appendChild(card);
        }
    };
    
    const flipCard = (cardId, card) => {
        cardsChosen.push(cardArray[cardId].name);
        cardsChosenIds.push(cardId);
        card.setAttribute("src", cardArray[cardId].img);
        if (cardsChosen.length === 2) {
          setTimeout(checkForMatch, 500);
        }
    }
    
    const checkForMatch = () => {
        const cards = document.querySelectorAll("img");
        const optionOneId = cardsChosenIds[0];
        const optionTwoId = cardsChosenIds[1];
    
        if (optionOneId === optionTwoId) {
            changeSubtitle("YOU HAVE PICKED THE SAME IMAGE!");
          handleAttribute(cards[optionOneId], "./src/assets/img/blank.png");
          handleAttribute(cards[optionTwoId], "./src/assets/img/blank.png");
        } else if (cardsChosen[0] === cardsChosen[1]) {
            changeSubtitle("YOU FOUND A MATCH!");
          handleAttribute(cards[optionOneId], "./src/assets/img/white.png");
          handleAttribute(cards[optionTwoId], "./src/assets/img/white.png");
          cards[optionOneId].style.border = "0px";
          cards[optionTwoId].style.border = "0px";
          cards[optionOneId].removeEventListener("click", flipCard);
          cards[optionTwoId].removeEventListener("click", flipCard);
          cardsWon.push(cardsChosen);
        } else {
            handleAttribute(cards[optionOneId],"./src/assets/img/blank.png");
            handleAttribute(cards[optionTwoId], "./src/assets/img/blank.png");
            changeSubtitle("OOPS! TRY AGAIN");
        }
    
        cardsChosen = [];
        cardsChosenIds = [];
        resultDisplay.innerHTML = cardsWon.length;
        if (cardsWon.length === cardArray.length / 2) {
          changeSubtitle("YOU WON!"); 
          restart.innerHTML = `<button class="restartButton">RESTART</button>`;
          restart.addEventListener("click", handleWin);
        }
    }

    const handleAttribute = (type, link) => {
        type.setAttribute("src", link);
    }

    const changeSubtitle = (text) => {
        subtitle.innerHTML = text;
    }
    
    const handleWin = () => {
      document.querySelectorAll("img").forEach(card => {
        card.src = "./src/assets/img/blank.png";
        card.style.border = "1px solid #81D2D6";
      });
      cardsWon = [];
      changeSubtitle("PICK TWO CARDS TO START");
      resultDisplay.innerHTML = "0";
      restart.style["display"]= "none";
    }
  
    createBoard();
});
  