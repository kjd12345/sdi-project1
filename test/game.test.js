// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// const Game = require('../src').Game;
import Player from "../src/player.js"
import Game from "../src/Game";

let testGame;

describe('Test The Game Class', () => {
  beforeEach(async() => {
    testGame = await Game.buildGame()
  })

  // test('instantiates a game class with deck id', () => {
  //   let testGame = new Game("test");
  //   expect(typeof testGame).toBe("object")
  //   expect(testGame.deck_id).toBe("test")
  // })
  test("instantiates a game class ",  () => {

    // console.log("\n\nHere is our test game value ",testGame,"\n\n\n")
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
      // testGame.player.drawnCards
      expect(Array.isArray(testGame.player.hand)).toBe(true)
      expect(typeof testGame.player.hand[0]).toBe("object")
      expect(typeof testGame.player.hand[0].image).toBe("string")
      expect(testGame.player.hand.length).toBe(1)
    })
    test("updates the score within the PLayer", async () => {
      // testGame.player.drawnCards
      let previousScore = testGame.player.score
      await testGame.drawCard(testGame.player)
      let newScore = testGame.player.score
      expect(previousScore < newScore).toBe(true)
    })

      test("busts the player when their score is over 21 after they draw a card", async () => {
      for(let i = 0; i < 8;i++){
        await testGame.drawCard(testGame.player)
      }

      expect(testGame.typeOfOutCome).toBe("busted")
      })

  })

  //stand Meth()
  describe("tests the stand() method", () => {
    beforeEach( async() => {
      await testGame.stand();
    } )
    test("dealerScore should be set", () => {
      expect(typeof testGame.dealerScore).toBe('number');
      expect(testGame.dealerScore).toBeGreaterThan(0) //this means the score was reassigned
    })
    test("if player score is greater than dealer score, player wins", async () => {
      testGame.player.score = 29;
      await testGame.stand();
      expect(testGame.typeOfOutCome).toEqual("Winner Winner Chicken Dinner");
    })
    test("if dealer score is greater than player, player loses", async () => {
      testGame.player.score = 16;
      await testGame.stand();
      expect(testGame.typeOfOutCome).toEqual("You Died");
    })
    // test("if scores are tied, it is a tie", async () => {
    //   testGame.player.score = testGame.dealerScore;
    //   expect(testGame.typeOfOutCome).toEqual("No Harm in Trying");
    // })
  })

  test("", () => {
    // nothing yet
  })
  // test("", () => {
  //   // nothing yet
  // })
  // test("", () => {
  //   // nothing yet
  // })


})





/*

test('', () => {

  })

*/









