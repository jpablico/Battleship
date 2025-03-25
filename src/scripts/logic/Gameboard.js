class Gameboard {
  constructor() {
    // Initialize the board with a more explicit approach
    this.board = [];
    for (let i = 0; i < 10; i++) {
      this.board[i] = [];
      for (let j = 0; j < 10; j++) {
        this.board[i][j] = null;
      }
    }
    this.ships = [];
    this.missedAttacks = [];
  }

  placeShip(ship, row, col, isHorizontal) {
    if (this.isPlacementPossible(ship, row, col, isHorizontal)) {
      this.ships.push(ship);
      
      if (isHorizontal) {
        for (let i = 0; i < ship.length; i++) {
          this.board[row][col + i] = {
            ship,
            index: i
          };
        }
      } else {
        for (let i = 0; i < ship.length; i++) {
          this.board[row + i][col] = {
            ship,
            index: i
          };
        }
      }
      return true;
    }
    return false;
  }

  isPlacementPossible(ship, row, col, isHorizontal) {
    // Check if placement is within board boundaries
    if (isHorizontal) {
      if (col + ship.length > 10) return false;
    } else {
      if (row + ship.length > 10) return false;
    }
    
    // Check if there's no collision with other ships
    if (isHorizontal) {
      for (let i = 0; i < ship.length; i++) {
        if (this.board[row][col + i] !== null) return false;
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        if (this.board[row + i][col] !== null) return false;
      }
    }
    
    return true;
  }

  receiveAttack(row, col) {
    // More robust type checking
    if (row === undefined || col === undefined || typeof row !== 'number' || typeof col !== 'number') {
      console.error(`Invalid coordinates: row=${row}, col=${col}`);
      return false;
    }
    
    // Ensure coordinates are integers
    row = Math.floor(row);
    col = Math.floor(col);
    
    // Check if coordinates are within bounds
    if (row < 0 || row >= 10 || col < 0 || col >= 10) {
      console.error(`Out of bounds: row=${row}, col=${col}`);
      return false;
    }
    
    // Ensure board is properly initialized
    if (!Array.isArray(this.board) || this.board.length !== 10) {
      console.error('Board is not properly initialized');
      return false;
    }
    
    // Ensure board[row] exists
    if (!Array.isArray(this.board[row])) {
      console.error(`Board row ${row} is not an array`);
      return false;
    }
    
    if (this.board[row][col] === null) {
      this.missedAttacks.push({ row, col });
      return false; // Miss
    } else {
      this.board[row][col].ship.hit();
      return true; // Hit
    }
  }

  allShipsSunk() {
    return this.ships.every(ship => ship.isSunk());
  }

  getMissedAttacks() {
    return this.missedAttacks;
  }
}

export default Gameboard;