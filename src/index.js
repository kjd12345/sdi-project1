// https://withaterriblefate.com/wp-content/uploads/2018/01/GTA8.png
// const Game = require('./Game');

// module.exports = {
//   Player: require('./player'),
//   Game: require('./game')
// }

// export {
//   Player: require('./player'),
//   Game: require('./game')
// }

import Game from "./game.js"
import Player from "./player.js"


let indexGame;

// (async function() {
// 	await someAsyncFunction();
// })();


indexGame = Game.buildGame(); //indexGame becomes an promise of a object

let counter = 2;

// indexGame.then(index => console.log("line 23",index))

indexGame.then( async (game) => {//draws two cards
  await game.drawCard(game.player);
  return game;
}).then(async (game) => {
  await game.drawCard(game.player);
  return game;
}).then(game => {
  // for(let card of game.player.hand) console.log(card);
  // console.log("here are the ",game.player.hand[0].image);
  // console.log('regular array', [0, 1, 2]);
  document.getElementById("playerCard1").src = game.player.hand[0].image;
  document.getElementById("playerCard2").src = game.player.hand[1].image;
  document.getElementById("playerScore").innerText = `Player Score: ${game.player.score}`;
  return game;
}).then(game => {
  let standButton = document.getElementById("standButton")
  standButton.addEventListener("click", () => {
    // alert('stand button was clicked from js')
    if(game.typeOfOutCome === undefined) {
      game.stand();
    }
  });
  hitButton.addEventListener("click", () => {
    // alert('hit button was clicked from js')
    if(game.typeOfOutCome === undefined) {
      game.drawCard(game.player)
      .then( () => {
        document.getElementById(`playerCard${counter + 1}`).src = game.player.hand[counter].image;
        document.getElementById("playerScore").innerText = `Player Score: ${game.player.score}`;

        counter++;
      })
    }

  });
})






//type module in package

// "./index.js" async></script>


//"type" : "module";
//must be in the root package of our root object