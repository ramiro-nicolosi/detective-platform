'use client';

import { memo } from 'react';
import { Clue } from '@/types/detective';

interface CluesListProps {
  clues: Clue[];
  onRevealClue: () => void;
}

const CluesList = memo(function CluesList({ clues, onRevealClue }: CluesListProps) {
  const unrevealedCount = clues.filter(c => !c.revealed).length;

  return (
    <div className="clues-list">
      {clues.map((clue, index) => (
        <div key={index} className={clue.revealed ? 'clue-item' : 'clue-item hidden-clue'}>
          <div className="clue-icon">
            {clue.revealed ? '🔍' : '❓'}
          </div>
          <div className="flex-1">
            <strong>{clue.revealed ? clue.category : 'Pista Oculta'}</strong>
            <p className="mt-1 mb-0">
              {clue.revealed ? clue.text : 'Revelar para obtener más información'}
            </p>
          </div>
        </div>
      ))}

      {unrevealedCount > 0 && (
        <button className="btn reveal-btn" onClick={onRevealClue}>
          🔓 Revelar Pista ({unrevealedCount} disponibles)
        </button>
      )}

      <style jsx>{`
        .clue-item {
          background: white;
          padding: 18px;
          border-radius: 10px;
          margin-bottom: 15px;
          border-left: 4px solid #4CAF50;
          box-shadow: 0 2px 6px rgba(0,0,0,0.08);
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .clue-icon {
          width: 40px;
          height: 40px;
          background: #4CAF50;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 18px;
          flex-shrink: 0;
        }

        .hidden-clue {
          background: #f5f5f5;
          border-left-color: #ccc;
          opacity: 0.7;
        }

        .hidden-clue .clue-icon {
          background: #ccc;
        }

        .hidden-clue p {
          color: #999;
        }

        .flex-1 {
          flex: 1;
        }

        .btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 25px;
          cursor: pointer;
          font-size: 16px;
          transition: all 0.3s ease;
        }

        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }

        .reveal-btn {
          margin-top: 15px;
        }
      `}</style>
    </div>
  );
});

export default CluesList;