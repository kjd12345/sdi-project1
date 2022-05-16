import Game from "../src/game.js";
import { JSDOM } from "jsdom";

let testGame;
let dom;

let sampleCard = {
  "image": "http://deckofcardsapi.com/static/img/2C.png",
  "value": "2",
  "suit": "CLUBS",
  "code": "2C"
}

describe('Tests the simple dealer logic', () => {
  beforeAll(async() => {
      await JSDOM.fromFile("./index.html")
          .then(newDom => {
          dom = newDom;
          }).then( () => {
          global.document = dom.window.document;
          global.window = dom.window;
          })
  })

  beforeEach(async () => {
      //will need to instatiate a game class and have the user and dealer scores faked
      testGame = await Game.buildGame().then(async (game) => {
        await Promise.all([game.drawCard(game.player), game.drawCard(game.player), game.drawCard(game.dealer)]);
        return game;
      });

  })
    test('dealer is an object', () => {
        //need to look to see if the dealer is a object
        expect(typeof testGame.dealer).toEqual("object");
    })

    test('dealer has cards', () => {
      //need to look to see if the dealer has drawn
      //score will be greater than 0
      //hand will not be empty
      expect(testGame.dealer.score > 0).toEqual(true);
      expect(testGame.dealer.hand.length > 0).toEqual(true);
    })

    test('dealer can draw', async () => {
      //need to look to see if the dealer has drawn a card
      //score will increase from 0
      let oldHand = testGame.dealer.hand.length;
      await testGame.drawCard(testGame.dealer);
      expect(testGame.dealer.hand.length > oldHand).toEqual(true);
    })

    test('dealer has a score', () => {
      expect(typeof testGame.dealer.score).toEqual("number");
    })

    test('if dealer score is busted the dealer will not draw', () => {
      testGame.dealer.score = 23;
      testGame.stand();
      expect(testGame.dealer.score).toEqual(23);
    })

    test('if dealer score is lower than player score, dealer will draw', async () => {
      testGame.dealer.score = 16;
      let oldHandLength = testGame.dealer.hand.length;
      testGame.player.score = 18;
      await testGame.stand();
      expect(testGame.dealer.hand.length > oldHandLength).toEqual(true);
    })

    test('if dealer hand is full, dealer will not draw', async () => {
      for(let i = 0; i < 4; i++) {
          testGame.dealer.hand.push(sampleCard);
      }
      testGame.player.score = 20;
      await testGame.stand();
      expect(testGame.dealer.hand.length).toEqual(5);
    })

    test('each card in the dealer`s hand should be displayed', () => {
      testGame.dealer.hand = [];
      for(let i = 0; i < 5; i++) {
          testGame.dealer.hand.push(sampleCard);
          expect(testGame.dealer.hand[i].image).toEqual("http://deckofcardsapi.com/static/img/2C.png");
      }

    })

//

})












// //40% chance of winning in the game