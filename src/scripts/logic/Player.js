import Gameboard from './Gameboard';

class Player {
  constructor(name, isComputer = false) {
    this.name = name;
    this.gameboard = new Gameboard();
    this.isComputer = isComputer;
    this.attacksMade = new Set();
  }

  attack(enemy, row, col) {
    // If coordinates have already been attacked, return false
    const key = `${row},${col}`;
    if (this.attacksMade.has(key)) {
      return false;
    }
    
    // Register this attack
    this.attacksMade.add(key);
    
    // Pass attack to enemy's gameboard
    return enemy.gameboard.receiveAttack(row, col);
  }

  randomAttack(enemy) {
    if (!this.isComputer) return false;
    
    let row, col, key;
    
    // Try to find coordinates that haven't been attacked yet
    do {
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
      key = `${row},${col}`;
    } while (this.attacksMade.has(key));
    
    // Register and perform the attack
    this.attacksMade.add(key);
    return {
      row,
      col,
      hit: enemy.gameboard.receiveAttack(row, col)
    };
  }
}

export default Player;