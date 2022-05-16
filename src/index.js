import Game from "./game.js"

// use a static method to instantiate our Game
Game.buildGame().then(game => {
  document.getElementById("hitButton").addEventListener("click", () => {
    if(game.typeOfOutCome === undefined) {
      game.drawCard(game.player);
    }
  });
  document.getElementById("standButton").addEventListener("click", () => {
    if(game.typeOfOutCome === undefined) {
      game.stand();
    }
  });
})