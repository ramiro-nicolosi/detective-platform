'use client';

import { useState, useCallback, useMemo } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useUserProgress } from '@/hooks/useUserProgress';
import { useGameLogic } from '@/hooks/useGameLogic';
import { sampleCases } from '@/data/cases';
import { GameTabName, Suspect } from '@/types/detective';
import '@/styles/case-overview.css';

import AuthForm from '@/components/AuthForm';
import CaseCard from '@/components/CaseCard';
import GameTabs from '@/components/GameTabs';
import SuspectsList from '@/components/SuspectsList';
import EvidenceList from '@/components/EvidenceList';
import CluesList from '@/components/CluesList';
import EnhancedSolutionForm, { SolutionData } from '@/components/EnhancedSolutionForm';
import ResultModal from '@/components/ResultModal';
import Modal from '@/components/Modal';
import WindowManager from '@/components/WindowManager';

export default function Home() {
  const { currentUser, isAuthenticated, isLoading, login, logout } = useAuth();
  const { addSolvedCase, getSolvedCases } = useUserProgress();
  const { currentCase, setCurrentCase, revealClue, checkSolution } = useGameLogic(null);
  
  const [activeGameTab, setActiveGameTab] = useState<GameTabName>('overview');
  const [showResultModal, setShowResultModal] = useState(false);
  const [showSolutionModal, setShowSolutionModal] = useState(false);
  const [resultData, setResultData] = useState<{
    isCorrect: boolean;
    culprit: string;
    method: string;
    motive: string;
  } | null>(null);

  const handleLogin = useCallback(() => {
    login();
  }, [login]);

  const handleStartCase = useCallback((caseId: number) => {
    const selectedCase = sampleCases.find(c => c.id === caseId);
    if (selectedCase) {
      setCurrentCase(selectedCase);
      setActiveGameTab('overview');
    }
  }, [setCurrentCase]);

  const handleBackToCases = useCallback(() => {
    setCurrentCase(null);
    setActiveGameTab('overview');
  }, [setCurrentCase]);



  const handleSubmitEnhancedSolution = useCallback((solution: SolutionData) => {
    const isCorrect = checkSolution(solution.culprit, solution.method, solution.motive);
    
    setResultData({ 
      isCorrect, 
      culprit: solution.culprit, 
      method: solution.method, 
      motive: solution.motive 
    });
    setShowResultModal(true);

    if (isCorrect && currentUser && currentCase) {
      addSolvedCase(currentUser, currentCase.id);
    }
  }, [checkSolution, currentUser, currentCase, addSolvedCase]);

  const handleShowSolution = useCallback(() => {
    setShowSolutionModal(true);
  }, []);

  const handleUpdateSuspect = useCallback((suspectIndex: number, updatedSuspect: Suspect) => {
    if (!currentCase) return;
    
    const updatedSuspects = [...currentCase.suspects];
    updatedSuspects[suspectIndex] = updatedSuspect;
    
    setCurrentCase({
      ...currentCase,
      suspects: updatedSuspects
    });
  }, [currentCase, setCurrentCase]);

  // Memoizar el contenido del resumen para evitar re-renders
  const overviewContent = useMemo(() => {
    if (!currentCase) return null;
    
    return (
      <div className="case-overview-container">
        <div className="case-header-section">
          <div className="case-title-card">
            <div className="case-icon">
              {currentCase.difficulty === 'easy' && '🟢'}
              {currentCase.difficulty === 'medium' && '🟡'}
              {currentCase.difficulty === 'hard' && '🔴'}
            </div>
            <div className="case-title-info">
              <h2 className="case-main-title">{currentCase.title}</h2>
              <span className={`difficulty-indicator difficulty-${currentCase.difficulty}`}>
                {currentCase.difficulty === 'easy' && 'Nivel Fácil'}
                {currentCase.difficulty === 'medium' && 'Nivel Intermedio'}
                {currentCase.difficulty === 'hard' && 'Nivel Difícil'}
              </span>
            </div>
          </div>
          
          <div className="case-description-card">
            <h4>📋 Descripción del Caso</h4>
            <p className="case-description">{currentCase.description}</p>
          </div>
        </div>

        <div className="case-details-grid">
          <div className="detail-card location-card">
            <div className="detail-icon">📍</div>
            <div className="detail-content">
              <h4>Ubicación</h4>
              <p>{currentCase.location}</p>
            </div>
          </div>
          
          <div className="detail-card time-card">
            <div className="detail-icon">🕐</div>
            <div className="detail-content">
              <h4>Marco Temporal</h4>
              <p>{currentCase.timeframe}</p>
            </div>
          </div>
        </div>
        
        <div className="stats-section">
          <h3 className="stats-title">Información de la Investigación</h3>
          <div className="stats-grid">
            <div className="stat-card suspects-stat">
              <div className="stat-icon">👥</div>
              <div className="stat-content">
                <div className="stat-number">{currentCase.suspects.length}</div>
                <div className="stat-label">Sospechosos</div>
                <div className="stat-description">Personas de interés</div>
              </div>
            </div>
            
            <div className="stat-card evidence-stat">
              <div className="stat-icon">🔍</div>
              <div className="stat-content">
                <div className="stat-number">{currentCase.evidence.length}</div>
                <div className="stat-label">Evidencias</div>
                <div className="stat-description">Pruebas físicas</div>
              </div>
            </div>
            
            <div className="stat-card clues-stat">
              <div className="stat-icon">🧩</div>
              <div className="stat-content">
                <div className="stat-number">{currentCase.clues.length}</div>
                <div className="stat-label">Pistas</div>
                <div className="stat-description">Información clave</div>
              </div>
            </div>
            
            <div className="stat-card progress-stat">
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <div className="stat-number">{Math.round((currentCase.clues.filter(c => c.revealed).length / currentCase.clues.length) * 100)}%</div>
                <div className="stat-label">Progreso</div>
                <div className="stat-description">Pistas reveladas</div>
              </div>
            </div>
          </div>
        </div>

        <div className="investigation-tips">
          <h4>💡 Consejos de Investigación</h4>
          <ul>
            <li>Interroga a todos los sospechosos para obtener información</li>
            <li>Examina cuidadosamente todas las evidencias</li>
            <li>Revela las pistas ocultas para obtener más información</li>
            <li>Conecta las pistas para formar una teoría sólida</li>
          </ul>
        </div>
      </div>
    );
  }, [currentCase]);

  const renderGameContent = useCallback(() => {
    if (!currentCase) return null;

    switch (activeGameTab) {
      case 'overview':
        return overviewContent;
      
      case 'suspects':
        return <SuspectsList suspects={currentCase.suspects} onUpdateSuspect={handleUpdateSuspect} />;
      
      case 'evidence':
        return <EvidenceList evidence={currentCase.evidence} />;
      
      case 'clues':
        return <CluesList clues={currentCase.clues} onRevealClue={revealClue} />;
      
      case 'solution':
        return <EnhancedSolutionForm suspects={currentCase.suspects} onSubmit={handleSubmitEnhancedSolution} />;
      
      default:
        return null;
    }
  }, [activeGameTab, overviewContent, currentCase, handleUpdateSuspect, revealClue, handleSubmitEnhancedSolution]);

  return (
    <div className="app-container">
      <div className="header">
        <h1>🕵️ Detective Cases</h1>
        <p>Resuelve misterios y casos de investigación</p>
      </div>

      {!isAuthenticated && !isLoading ? (
        <AuthForm onLogin={handleLogin} />
      ) : isLoading ? (
        <div className="loading-screen">
          <div className="loading-content">
            <div className="loading-spinner"></div>
            <p>Verificando credenciales...</p>
          </div>
        </div>
      ) : !currentCase ? (
        <div className="main-content">
          <div className="user-info">
            <div>
              <strong>Bienvenido, {currentUser}</strong>
              <div>Casos resueltos: {getSolvedCases(currentUser!)}</div>
            </div>
            <button className="btn btn-secondary" onClick={logout}>
              Cerrar Sesión
            </button>
          </div>

          <h2 className="cases-title">Casos Disponibles</h2>
          <div className="cases-grid">
            {sampleCases.map(caseItem => (
              <CaseCard 
                key={caseItem.id} 
                case={caseItem} 
                onStart={handleStartCase} 
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="case-game">
          <div className="game-header">
            <button className="btn btn-secondary" onClick={handleBackToCases}>
              ← Volver a Casos
            </button>
            <h2>{currentCase.title}</h2>
            <p>{currentCase.description}</p>
          </div>

          <GameTabs activeTab={activeGameTab} onTabChange={setActiveGameTab} />
          
          <div className="game-content">
            {renderGameContent()}
          </div>
        </div>
      )}


      {resultData && (
        <ResultModal
          isOpen={showResultModal}
          isCorrect={resultData.isCorrect}
          culprit={resultData.culprit}
          method={resultData.method}
          motive={resultData.motive}
          solution={currentCase?.solution || ''}
          onClose={() => setShowResultModal(false)}
          onShowSolution={handleShowSolution}
        />
      )}

      <Modal isOpen={showSolutionModal} onClose={() => setShowSolutionModal(false)}>
        <div className="solution-reveal">
          <h2 className="solution-title">📋 Solución Oficial</h2>
          <div className="culprit-section">
            <h3 style={{color: '#000', fontWeight: '600'}}>El Culpable:</h3>
            <p className="culprit-name">{
              currentCase?.id === 1 ? "Carlos Martín" :
              currentCase?.id === 2 ? "Robert Sterling" :
              currentCase?.id === 3 ? "Thomas Anderson" : ""
            }</p>
          </div>
          <div className="explanation-section">
            <h3 style={{color: '#000', fontWeight: '600'}}>Explicación:</h3>
            <p style={{color: '#000', fontWeight: '500'}}>{currentCase?.solution}</p>
          </div>
          <button className="btn" onClick={() => setShowSolutionModal(false)}>
            Entendido
          </button>
        </div>
      </Modal>

      <style jsx>{`
        .app-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          background-attachment: fixed;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          color: #1a1a1a;
          line-height: 1.5;
        }

        .header {
          text-align: center;
          margin-bottom: 30px;
          color: white;
        }

        .header h1 {
          font-size: 3em;
          margin-bottom: 10px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .main-content {
          max-width: 1200px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1), 0 8px 20px rgba(102,126,234,0.15);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .user-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 8px;
        }

        .cases-title {
          margin-bottom: 20px;
          color: #333;
          font-size: 2em;
        }

        .cases-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }

        .case-game {
          max-width: 1200px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1), 0 8px 20px rgba(102,126,234,0.15);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .game-header {
          border-bottom: 2px solid #eee;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }

        .game-header h2 {
          margin: 15px 0 10px 0;
          color: #333;
          font-size: 2em;
        }

        .game-content {
          min-height: 500px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%);
          border-radius: 24px;
          padding: 32px;
          margin-top: 24px;
          box-shadow: 0 12px 48px rgba(0, 0, 0, 0.08),
                      0 6px 24px rgba(102, 126, 234, 0.12);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.8);
          position: relative;
          overflow: hidden;
          animation: slideInUp 0.5s ease-out;
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .solution-reveal {
          text-align: center;
        }

        .solution-title {
          color: #667eea;
          margin-bottom: 20px;
          font-size: 1.8em;
        }

        .culprit-section {
          background: #F0F8FF;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        .culprit-name {
          font-size: 18px;
          font-weight: bold;
          color: #F44336;
        }

        .explanation-section {
          background: #F8F9FA;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 20px;
          text-align: left;
        }

        .explanation-section h3 {
          text-align: center;
          margin-top: 0;
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

        .btn-secondary {
          background: #6c757d;
        }

        .loading-screen {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 400px;
        }

        .loading-content {
          text-align: center;
          color: white;
        }

        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 4px solid rgba(255, 255, 255, 0.3);
          border-top: 4px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 20px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .cases-grid {
            grid-template-columns: 1fr;
          }
          
          .user-info {
            flex-direction: column;
            gap: 15px;
            text-align: center;
          }
        }
      `}</style>
      
      <WindowManager />
    </div>
  );
}
