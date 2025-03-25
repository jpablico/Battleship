import Player from '../scripts/logic/Player';
import Ship from '../scripts/logic/Ship';

describe('Player', () => {
  let player, computer, enemyPlayer;
  
  beforeEach(() => {
    player = new Player('Human');
    computer = new Player('Computer', true);
    enemyPlayer = new Player('Enemy');
    
    // Place a ship on enemy's board for testing
    const ship = new Ship(3);
    enemyPlayer.gameboard.placeShip(ship, 0, 0, true);
  });

  test('should create a player with a gameboard', () => {
    expect(player.gameboard).toBeDefined();
  });

  test('human player should be able to attack enemy', () => {
    const result = player.attack(enemyPlayer, 0, 0);
    expect(result).toBe(true); // Hit
    
    const missResult = player.attack(enemyPlayer, 5, 5);
    expect(missResult).toBe(false); // Miss
  });

  test('should not be able to attack the same position twice', () => {
    player.attack(enemyPlayer, 0, 0);
    const result = player.attack(enemyPlayer, 0, 0);
    expect(result).toBe(false);
  });

  test('computer should be able to make random attacks', () => {
    const result = computer.randomAttack(enemyPlayer);
    expect(result).toHaveProperty('row');
    expect(result).toHaveProperty('col');
    expect(result).toHaveProperty('hit');
  });

  test('computer should not attack the same position twice', () => {
    // Mock Math.random to always return 0 (position 0,0)
    const mockMath = Object.create(global.Math);
    mockMath.random = () => 0;
    global.Math = mockMath;
    
    // First attack at 0,0
    computer.randomAttack(enemyPlayer);
    
    // Set Math.random to return first 0, then 0.1 on second call
    let callCount = 0;
    mockMath.random = () => {
      callCount++;
      return callCount > 2 ? 0.1 : 0; // Return 0 for first two calls (row,col), then 0.1
    };
    
    // Second attack should not be at 0,0
    const result = computer.randomAttack(enemyPlayer);
    expect(result.row === 0 && result.col === 0).toBe(false);
    
    // Restore the original Math object
    global.Math = Object.create(mockMath);
  });
});