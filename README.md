# SDI #10 Project 1
## Summary
The purpose of this project is to demonstrate our capability to do the following:
  <!-- - Build a static webpage
  - Layout a well designed static webpage using HTML & CSS
  - Make fetch requests to hydrate a static page with data
  - Create interactivity using object oriented JavaScript
  - Write robust unit tests for JavaScript code -->

### API
This game uses the [Deck of Cards API](http://deckofcardsapi.com/) to generate and maintain a deck of cards for our game. Please visit their site for detailed documentation.

### Setup:
- run `npm install` to install dependencies
- run `npm test` to run the tests
- run `npm start` to start the game
  - navigate to http://127.0.0.1:8080/

## Blackjack


### Game Instructions
- When the program is started, the game will automatically draw two cards for the player and display the current score.
  - The game will auto-win if the first two cards result in Blackjack

- To continue the game, click '**Hit**' to draw another card, or '**Stand**' to end the round and evaluate your score against a simulated dealer score.
  - You can only hold a **maximum of 5 cards**. If 5 cards are held and the player has not busted, then the player will win automatically
  - Once the game has come to one of the outcomes (listed below), the '**Hit**' and '**Stand**' buttons will not work. Only the '**New Game**' button will be functional.

- Click the '**New Game**' button at any time to immediately start a new round, this button will have to be clicked after a round is finished.

- Possible Game Outcomes
  - **Busted:** The player's score is over 21
  - **Winner Winner Chicken Dinner:** The player's score beat the dealer's score
  - **You Died:** The dealer's score beat the player's score
  - **No Harm in Trying:** The player's score tied with the dealer's score





