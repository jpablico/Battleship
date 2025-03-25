import Ship from '../scripts/logic/Ship';

describe('Ship', () => {
  test('should create a ship with the correct length', () => {
    const ship = new Ship(4);
    expect(ship.length).toBe(4);
  });

  test('should start with 0 hits', () => {
    const ship = new Ship(3);
    expect(ship.hits).toBe(0);
  });

  test('hit() should increase the hit count', () => {
    const ship = new Ship(3);
    ship.hit();
    expect(ship.hits).toBe(1);
    ship.hit();
    expect(ship.hits).toBe(2);
  });

  test('isSunk() should return false if hits < length', () => {
    const ship = new Ship(3);
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });

  test('isSunk() should return true if hits >= length', () => {
    const ship = new Ship(2);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});