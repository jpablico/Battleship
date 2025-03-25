import React, { useState, useEffect } from 'react';
import Gameboard from './Gameboard.js';
import Announcement from './Announcement.js';
import Game from '../logic/Game.js';

const App = () => {
  const [game, setGame] = useState(null);
  const [message, setMessage] = useState('');
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    try {
      const newGame = new Game();
      newGame.setupGame();
      setGame(newGame);
      setMessage('Game started. Click on the computer\'s board to attack!');
      setGameStarted(true);
    } catch (error) {
      console.error('Error starting game:', error);
      setMessage('Error starting game. Please try again.');
    }
  };

  const handleCellClick = (row, col) => {
    if (!game || !gameStarted || game.gameOver || game.currentPlayer !== game.humanPlayer) return;

    // Human player's turn
    const result = game.playTurn(row, col);
    
    if (result.valid) {
      setMessage(result.message);
      
      // If game is over, don't process computer's turn
      if (result.gameOver) {
        return;
      }
      
      // Simulate computer's turn with a slight delay
      setTimeout(() => {
        // Use a separate computerTurn method instead of playTurn without args
        const computerMove = game.computerPlayer.randomAttack(game.humanPlayer);
        
        // Update game state after computer's move
        if (game.humanPlayer.gameboard.allShipsSunk()) {
          setMessage('Computer wins!');
          game.gameOver = true;
        } else {
          game.currentPlayer = game.humanPlayer;
          setMessage(computerMove.hit ? 'Computer hit!' : 'Computer missed!');
        }
      }, 500);
    } else {
      setMessage(result.message);
    }
  };

  return (
    <div className="app">
      <h1>Battleship Game</h1>
      
      <Announcement message={message} />
      
      <div className="game-container">
        {game && (
          <>
            <div className="board-container">
              <h2>Your Board</h2>
              <Gameboard 
                board={game.humanPlayer.gameboard.board}
                missedAttacks={game.humanPlayer.gameboard.getMissedAttacks()}
                isPlayerBoard={true}
              />
            </div>
            <div className="board-container">
              <h2>Computer's Board</h2>
              <Gameboard 
                board={game.computerPlayer.gameboard.board}
                missedAttacks={game.computerPlayer.gameboard.getMissedAttacks()}
                isPlayerBoard={false}
                onCellClick={handleCellClick}
              />
            </div>
          </>
        )}
      </div>
      
      <div className="controls">
        <button onClick={startNewGame}>New Game</button>
      </div>
    </div>
  );
};

export default App;