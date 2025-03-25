import Player from './Player';
import Ship from './Ship';

class Game {
  constructor() {
    this.humanPlayer = new Player('Human');
    this.computerPlayer = new Player('Computer', true);
    this.currentPlayer = this.humanPlayer;
    this.winner = null;
    this.gameOver = false;
  }

  setupGame() {
    // Ship lengths for the game
    const shipLengths = [5, 4, 3, 3, 2];
    
    // Place ships randomly for human player
    this.placeShipsRandomly(this.humanPlayer, shipLengths);
    
    // Place ships randomly for computer player
    this.placeShipsRandomly(this.computerPlayer, shipLengths);
  }

  placeShipsRandomly(player, shipLengths) {
    shipLengths.forEach(length => {
      let placed = false;
      const ship = new Ship(length);
      
      while (!placed) {
        const row = Math.floor(Math.random() * 10);
        const col = Math.floor(Math.random() * 10);
        const isHorizontal = Math.random() > 0.5;
        
        placed = player.gameboard.placeShip(ship, row, col, isHorizontal);
      }
    });
  }

  playTurn(row, col) {
    if (this.gameOver) return { valid: false, message: 'Game is over' };
    
    // Human player's turn
    if (this.currentPlayer === this.humanPlayer) {
      const hit = this.humanPlayer.attack(this.computerPlayer, row, col);
      
      // Check if valid attack (not repeated)
      if (hit === false && this.computerPlayer.gameboard.board[row][col] === null) {
        return { valid: true, hit: false, message: 'Miss!' };
      } else if (hit === false) {
        return { valid: false, message: 'Invalid attack. Try again.' };
      }
      
      // Check if game is over
      if (this.computerPlayer.gameboard.allShipsSunk()) {
        this.winner = this.humanPlayer;
        this.gameOver = true;
        return { valid: true, hit: true, gameOver: true, winner: 'Human', message: 'You win!' };
      }
      
      // Switch to computer's turn
      this.currentPlayer = this.computerPlayer;
      return { valid: true, hit: true, message: 'Hit!' };
    } 
    // Computer player's turn
    else {
      return this.computerTurn();
    }
  }

  // Add this method to handle computer turns separately
  computerTurn() {
    if (this.gameOver) return { valid: false, message: 'Game is over' };
    
    const result = this.computerPlayer.randomAttack(this.humanPlayer);
    
    // Check if game is over
    if (this.humanPlayer.gameboard.allShipsSunk()) {
      this.winner = this.computerPlayer;
      this.gameOver = true;
      return { 
        valid: true, 
        hit: result.hit, 
        computerMove: { row: result.row, col: result.col },
        gameOver: true, 
        winner: 'Computer',
        message: 'Computer wins!'
      };
    }
    
    // Switch back to human's turn
    this.currentPlayer = this.humanPlayer;
    return { 
      valid: true, 
      hit: result.hit, 
      computerMove: { row: result.row, col: result.col },
      message: result.hit ? 'Computer hit!' : 'Computer missed!'
    };
  }

  resetGame() {
    this.humanPlayer = new Player('Human');
    this.computerPlayer = new Player('Computer', true);
    this.currentPlayer = this.humanPlayer;
    this.winner = null;
    this.gameOver = false;
    this.setupGame();
  }
}

export default Game;