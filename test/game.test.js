// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// const Game = require('../src').Game;
import Player from "../src/player.js"
import Game from "../src/game.js";
import { JSDOM } from "jsdom";

let dom;
let testGame;
let sampleCard = {
  "image": "http://deckofcardsapi.com/static/img/2C.png",
  "value": "2",
  "suit": "CLUBS",
  "code": "2C"
}

describe('Test The Game Class', () => {
  beforeAll(async() => {

    await JSDOM.fromFile("./index.html")
      .then(newDom => {
        dom = newDom;
      }).then( () => {
        global.document = dom.window.document;
        global.window = dom.window;
      })
  })

  beforeEach(async() => {
    testGame = await Game.buildGame();
  })

  test("instantiates a game class ",  () => {
    expect(typeof testGame).toBe("object")
    expect(typeof testGame.deck_id).toBe("string")
    //Game.buildGame().then()
  })

  test("makes a player", () => {
    expect(typeof testGame.player).toBe("object")
    // nothing yet
  })

  describe('test the player property', () => {
    beforeEach(async() => {
        await testGame.drawCard(testGame.player)
      })

    test("draws a card from for the Player", async () => {
      expect(Array.isArray(testGame.player.hand)).toBe(true)
      expect(typeof testGame.player.hand[0]).toBe("object")
      expect(typeof testGame.player.hand[0].image).toBe("string")
      expect(testGame.player.hand.length).toBe(3)
    })
    test("updates the score within the PLayer (will fail once in a while due to Aces)", async () => {
      let previousScore = testGame.player.score
      await testGame.drawCard(testGame.player)
      let newScore = testGame.player.score
      expect(previousScore < newScore).toBe(true)
    })
    test("busts the player when their score is over 21 after they draw a card", async () => {
      for(let i = 0; i < 11;i++){
        testGame.player.hand.push(sampleCard);
      }
      await testGame.drawCard(testGame.player);
      expect(testGame.typeOfOutCome).toBe("Busted")
    })
    test("if player's hand is greater than 4, set outcome and endgame", async () => {
      testGame.player.hand = [];
      for(let i = 0; i < 4;i++){
        testGame.player.hand.push(sampleCard);
      }
      await testGame.drawCard(testGame.player);
      expect(testGame.typeOfOutCome).toBe("Winner Winner Chicken Dinner")
    })

  })

  describe("tests the stand() method", () => {
    beforeEach( async() => {
      testGame.player.score = 1;
      await testGame.stand();
    })
    test("dealerScore should be set", () => {
      expect(typeof testGame.dealer.score).toBe('number');
      expect(testGame.dealer.score).toBeGreaterThan(0) //this means the score was reassigned
    })
  })

  describe('tests the evaluateOutcome() method', () => {
    test("if player score is greater than dealer score, player wins", async () => {
      testGame.player.score = 21;
      testGame.dealer.score = 18;
      testGame.evaluateOutcome();
      expect(testGame.typeOfOutCome).toEqual("Winner Winner Chicken Dinner");
    })
    test("if the dealer busts, player wins", async () => {
      testGame.player.score = 17;
      testGame.dealer.score = 24;
      testGame.evaluateOutcome();
      expect(testGame.typeOfOutCome).toEqual("Winner Winner Chicken Dinner");
    })
    test("if dealer score is greater than player, player loses", async () => {
        testGame.player.score = 17;
        testGame.dealer.score = 21;
        testGame.evaluateOutcome();
        expect(testGame.typeOfOutCome).toEqual("You Lost");
    })
    test("if scores are tied, it is a tie", async () => {
      testGame.player.score = 18;
      testGame.dealer.score = 18;
      testGame.evaluateOutcome();
      expect(testGame.typeOfOutCome).toEqual("Push");
    })
  })

  describe("tests the endGame() method", () => {
    beforeEach( () => {
      testGame.dealer.score = 17;
      testGame.typeOfOutCome = 'Winner Winner Chicken Dinner';
      testGame.endGame();
    })
    test("gameOutcome text should be set on the page", async () => {
      await new Promise(r => setTimeout(() => r(), 1000));
      expect(document.getElementById('gameOutcome').innerText).toEqual(`Winner Winner Chicken Dinner`);
    })
    test("gameOutcome text should be not hidden", async () => {
      await new Promise(r => setTimeout(() => r(), 1000));
      expect(document.getElementById('gameOutcome').hidden).toEqual(false);
    })
  })

})