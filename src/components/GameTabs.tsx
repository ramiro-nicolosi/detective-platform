'use client';

import { GameTabName } from '@/types/detective';

interface GameTabsProps {
  activeTab: GameTabName;
  onTabChange: (tab: GameTabName) => void;
}

export default function GameTabs({ activeTab, onTabChange }: GameTabsProps) {
  const tabs = [
    { key: 'overview', label: 'Resumen' },
    { key: 'suspects', label: 'Sospechosos' },
    { key: 'evidence', label: 'Evidencias' },
    { key: 'clues', label: 'Pistas' },
    { key: 'solution', label: 'Solución' },
  ] as const;

  return (
    <div className="game-tabs">
      {tabs.map(tab => (
        <button
          key={tab.key}
          className={`game-tab ${activeTab === tab.key ? 'active' : ''}`}
          onClick={() => onTabChange(tab.key)}
        >
          {tab.label}
        </button>
      ))}

      <style jsx>{`
        .game-tabs {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }

        .game-tab {
          padding: 10px 20px;
          background: #f8f9fa;
          border: none;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 14px;
        }

        .game-tab.active {
          background: #667eea;
          color: white;
        }

        .game-tab:hover:not(.active) {
          background: #e9ecef;
        }
      `}</style>
    </div>
  );
}