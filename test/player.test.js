// const Player = require('../src').Player;

import Player from "../src/player.js"

let testPlayer;
let sampleInput = [{"code": "JH", "image": "https://deckofcardsapi.com/static/img/JH.png", "images": {"svg": "https://deckofcardsapi.com/static/img/JH.svg", "png": "https://deckofcardsapi.com/static/img/JH.png"}, "value": "JACK", "suit": "HEARTS"}, {"code": "7D", "image": "https://deckofcardsapi.com/static/img/7D.png", "images": {"svg": "https://deckofcardsapi.com/static/img/7D.svg", "png": "https://deckofcardsapi.com/static/img/7D.png"}, "value": "7", "suit": "DIAMONDS"}]

//sample with 3 cards and at least 1 ace
let aceInput = [{"code": "AH", "image": "https://deckofcardsapi.com/static/img/AH.png", "images": {"svg": "https://deckofcardsapi.com/static/img/AH.svg", "png": "https://deckofcardsapi.com/static/img/AH.png"}, "value": "ACE", "suit": "HEARTS"}, {"code": "2H", "image": "https://deckofcardsapi.com/static/img/2H.png", "images": {"svg": "https://deckofcardsapi.com/static/img/2H.svg", "png": "https://deckofcardsapi.com/static/img/2H.png"}, "value": "2", "suit": "HEARTS"}, {"code": "QS", "image": "https://deckofcardsapi.com/static/img/QS.png", "images": {"svg": "https://deckofcardsapi.com/static/img/QS.svg", "png": "https://deckofcardsapi.com/static/img/QS.png"}, "value": "QUEEN", "suit": "SPADES"}]

//sample with 3 cards and two aces
let multiAceInput = [{"code": "AH", "image": "https://deckofcardsapi.com/static/img/AH.png", "images": {"svg": "https://deckofcardsapi.com/static/img/AH.svg", "png": "https://deckofcardsapi.com/static/img/AH.png"}, "value": "ACE", "suit": "HEARTS"}, {"code": "AH", "image": "https://deckofcardsapi.com/static/img/AH.png", "images": {"svg": "https://deckofcardsapi.com/static/img/AH.svg", "png": "https://deckofcardsapi.com/static/img/AH.png"}, "value": "ACE", "suit": "HEARTS"}, {"code": "QS", "image": "https://deckofcardsapi.com/static/img/QS.png", "images": {"svg": "https://deckofcardsapi.com/static/img/QS.svg", "png": "https://deckofcardsapi.com/static/img/QS.png"}, "value": "QUEEN", "suit": "SPADES"}]

describe('Test The Player Class', () => {
  beforeEach(() => {
    testPlayer = new Player();
  })

  test('instantiates a player class', () => {
    expect(testPlayer.score).toBe(0);
    expect(testPlayer.hand).toEqual([]);
  })

  test('calculates player score', () => {
    testPlayer.hand = sampleInput;
    testPlayer.updateScore();
    expect(testPlayer.score).toBe(17)
  })

  test('calculates player score with aces', () => {
    testPlayer.hand = aceInput;
    testPlayer.updateScore();
    expect(testPlayer.score).toBe(13)
  })

  test('calculates player score with multiple aces', () => {
    testPlayer.hand = multiAceInput;
    testPlayer.updateScore();
    expect(testPlayer.score).toBe(12)
  })
})