'use client';

import { memo } from 'react';
import { DetectiveCase } from '@/types/detective';

interface CaseCardProps {
  case: DetectiveCase;
  onStart: (caseId: number) => void;
}

const CaseCard = memo(function CaseCard({ case: detectiveCase, onStart }: CaseCardProps) {
  const getDifficultyText = (difficulty: string) => {
    const texts = {
      easy: 'Fácil',
      medium: 'Intermedio',
      hard: 'Difícil'
    };
    return texts[difficulty as keyof typeof texts] || 'Fácil';
  };

  return (
    <div className={`case-card ${detectiveCase.difficulty}`} onClick={() => onStart(detectiveCase.id)}>
      <div className={`difficulty-badge difficulty-${detectiveCase.difficulty}`}>
        {getDifficultyText(detectiveCase.difficulty)}
      </div>
      <div className="case-title">{detectiveCase.title}</div>
      <div className="case-description">{detectiveCase.description}</div>
      <div className="case-meta">
        <span>Sospechosos: {detectiveCase.suspects.length}</span>
        <span>Evidencias: {detectiveCase.evidence.length}</span>
      </div>

      <style jsx>{`
        .case-card {
          background: linear-gradient(135deg, #f8faff 0%, #e3f2fd 100%);
          border-radius: 16px;
          padding: 24px;
          cursor: pointer;
          transition: all 0.3s ease;
          border-left: 5px solid;
          border: 1px solid rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(5px);
        }

        .case-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 15px 35px rgba(0,0,0,0.12), 0 5px 15px rgba(102,126,234,0.2);
          border: 1px solid rgba(102,126,234,0.3);
        }

        .case-card.easy { border-left-color: #4CAF50; }
        .case-card.medium { border-left-color: #FF9800; }
        .case-card.hard { border-left-color: #F44336; }

        .difficulty-badge {
          display: inline-block;
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: bold;
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .difficulty-easy { background: #E8F5E8; color: #4CAF50; }
        .difficulty-medium { background: #FFF3E0; color: #FF9800; }
        .difficulty-hard { background: #FFEBEE; color: #F44336; }

        .case-title {
          font-size: 1.4em;
          font-weight: bold;
          margin-bottom: 10px;
          color: #333;
        }

        .case-description {
          color: #666;
          line-height: 1.5;
          margin-bottom: 15px;
        }

        .case-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
          color: #888;
        }
      `}</style>
    </div>
  );
});

export default CaseCard;