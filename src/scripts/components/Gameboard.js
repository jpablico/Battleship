import React from 'react';
import '../../styles/components/Gameboard.scss';

const Gameboard = ({ board, missedAttacks, isPlayerBoard, onCellClick }) => {
  const renderCell = (cell, row, col) => {
    // Check if this coordinate has a missed attack
    const isMissed = missedAttacks.some(attack => attack.row === row && attack.col === col);
    
    let cellClass = 'cell';
    
    if (cell) {
      if (cell.ship.hits >= cell.index + 1) {
        cellClass += ' hit';
      } else if (isPlayerBoard) {
        cellClass += ' ship';
      }
    } else if (isMissed) {
      cellClass += ' missed';
    }
    
    return (
      <div 
        key={`${row}-${col}`} 
        className={cellClass}
        onClick={() => onCellClick && !isPlayerBoard ? onCellClick(row, col) : null}
      />
    );
  };

  return (
    <div className="gameboard">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => renderCell(cell, rowIndex, colIndex))}
        </div>
      ))}
    </div>
  );
};

export default Gameboard;