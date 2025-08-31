'use client';

import { memo, useCallback } from 'react';
import { Suspect } from '@/types/detective';
import SuspectChat from './SuspectChat';
import LazyImage from './LazyImage';
import { useWindowManager } from './WindowManager';

interface SuspectsListProps {
  suspects: Suspect[];
  onUpdateSuspect?: (suspectIndex: number, updatedSuspect: Suspect) => void;
}

const SuspectsList = memo(function SuspectsList({ suspects, onUpdateSuspect }: SuspectsListProps) {
  const { openWindow } = useWindowManager();

  const handleInterrograteSuspect = useCallback((suspect: Suspect, index: number) => {
    openWindow({
      id: `suspect-${suspect.name}`,
      title: `Interrogatorio: ${suspect.name}`,
      children: (
        <SuspectChat
          suspect={suspect}
          onUpdateSuspect={(updatedSuspect) => {
            if (onUpdateSuspect) {
              onUpdateSuspect(index, updatedSuspect);
            }
          }}
          onClose={() => {}}
        />
      ),
      width: 700,
      height: 600
    });
  }, [openWindow, onUpdateSuspect]);
  return (
    <>
      <div className="suspects-list">
        {suspects.map((suspect, index) => (
          <div key={index} className="suspect-item">
            <div className="suspect-photo">
              <LazyImage src={suspect.photo} alt={suspect.name} />
            </div>
            <div className="suspect-info">
              <div className="suspect-name">{suspect.name}</div>
              <div className="suspect-role">{suspect.role} - {suspect.age} años</div>
              <p className="mb-2">{suspect.description}</p>
              <div className="suspect-details">
                <p><strong>🕐 Coartada:</strong> {suspect.alibi}</p>
                <p><strong>📝 Antecedentes:</strong> {suspect.background}</p>
              </div>
              
              <div className="chat-info">
                <p><strong>💬 Conversaciones:</strong> {suspect.chatHistory.length} mensajes</p>
              </div>
              
              <button 
                className="interrogate-btn" 
                onClick={() => handleInterrograteSuspect(suspect, index)}
              >
                🔍 Interrogar Sospechoso
              </button>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .suspect-item {
          background: white;
          padding: 20px;
          border-radius: 12px;
          margin-bottom: 20px;
          border: 1px solid #ddd;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          display: flex;
          gap: 20px;
          align-items: flex-start;
        }

        .suspect-photo {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          overflow: hidden;
          flex-shrink: 0;
          border: 3px solid #fff;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          background: #f0f0f0;
        }

        .suspect-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }

        .suspect-info {
          flex: 1;
        }

        .suspect-name {
          font-size: 1.4em;
          font-weight: bold;
          color: #333;
          margin-bottom: 8px;
        }

        .suspect-role {
          color: #667eea;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .suspect-details {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 8px;
          margin-top: 10px;
        }

        .suspect-details p {
          margin: 0 0 8px 0;
        }

        .suspect-details p:last-child {
          margin-bottom: 0;
        }

        .chat-info {
          background: #e8f5e8;
          padding: 10px 15px;
          border-radius: 8px;
          margin-top: 15px;
          border-left: 4px solid #4CAF50;
        }

        .chat-info p {
          margin: 0;
          font-size: 14px;
          color: #1b5e20;
          font-weight: 600;
        }

        .interrogate-btn {
          background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: bold;
          margin-top: 15px;
          transition: all 0.3s ease;
          width: 100%;
        }

        .interrogate-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(76, 175, 80, 0.3);
        }

        @media (max-width: 768px) {
          .suspect-item {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </>
  );
});

export default SuspectsList;