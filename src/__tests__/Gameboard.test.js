import Gameboard from '../scripts/logic/Gameboard';
import Ship from '../scripts/logic/Ship';

describe('Gameboard', () => {
  let gameboard;
  
  beforeEach(() => {
    gameboard = new Gameboard();
  });

  test('should place a ship horizontally', () => {
    const ship = new Ship(3);
    const result = gameboard.placeShip(ship, 0, 0, true);
    expect(result).toBe(true);
    expect(gameboard.board[0][0]).not.toBeNull();
    expect(gameboard.board[0][1]).not.toBeNull();
    expect(gameboard.board[0][2]).not.toBeNull();
  });

  test('should place a ship vertically', () => {
    const ship = new Ship(3);
    const result = gameboard.placeShip(ship, 0, 0, false);
    expect(result).toBe(true);
    expect(gameboard.board[0][0]).not.toBeNull();
    expect(gameboard.board[1][0]).not.toBeNull();
    expect(gameboard.board[2][0]).not.toBeNull();
  });

  test('should not place a ship outside the board horizontally', () => {
    const ship = new Ship(3);
    const result = gameboard.placeShip(ship, 0, 8, true);
    expect(result).toBe(false);
  });

  test('should not place a ship outside the board vertically', () => {
    const ship = new Ship(3);
    const result = gameboard.placeShip(ship, 8, 0, false);
    expect(result).toBe(false);
  });

  test('should not place a ship if it collides with another ship', () => {
    const ship1 = new Ship(3);
    const ship2 = new Ship(2);
    gameboard.placeShip(ship1, 0, 0, true);
    const result = gameboard.placeShip(ship2, 0, 1, false);
    expect(result).toBe(false);
  });

  test('receiveAttack should register a hit', () => {
    const ship = new Ship(3);
    gameboard.placeShip(ship, 0, 0, true);
    const hit = gameboard.receiveAttack(0, 0);
    expect(hit).toBe(true);
    expect(ship.hits).toBe(1);
  });

  test('receiveAttack should register a miss', () => {
    const missedBefore = gameboard.missedAttacks.length;
    const hit = gameboard.receiveAttack(5, 5);
    expect(hit).toBe(false);
    expect(gameboard.missedAttacks.length).toBe(missedBefore + 1);
  });

  test('allShipsSunk should return true when all ships are sunk', () => {
    const ship1 = new Ship(1);
    const ship2 = new Ship(1);
    gameboard.placeShip(ship1, 0, 0, true);
    gameboard.placeShip(ship2, 1, 0, true);
    
    gameboard.receiveAttack(0, 0);
    expect(gameboard.allShipsSunk()).toBe(false);
    
    gameboard.receiveAttack(1, 0);
    expect(gameboard.allShipsSunk()).toBe(true);
  });
});