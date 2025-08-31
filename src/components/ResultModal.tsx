'use client';

import Modal from './Modal';

interface ResultModalProps {
  isOpen: boolean;
  isCorrect: boolean;
  culprit: string;
  method: string;
  motive: string;
  solution: string;
  onClose: () => void;
  onShowSolution?: () => void;
}

export default function ResultModal({ 
  isOpen, 
  isCorrect, 
  culprit, 
  method, 
  motive, 
  solution,
  onClose, 
  onShowSolution 
}: ResultModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="result-modal">
        {isCorrect ? (
          <>
            <h2 className="success-title">🎉 ¡Caso Resuelto!</h2>
            <div className="user-solution">
              <h3 style={{color: '#000', fontWeight: '600'}}>Tu Solución:</h3>
              <p style={{color: '#000', fontWeight: '500'}}><strong>Culpable:</strong> {culprit}</p>
              <p style={{color: '#000', fontWeight: '500'}}><strong>Método:</strong> {method}</p>
              <p style={{color: '#000', fontWeight: '500'}}><strong>Motivo:</strong> {motive}</p>
            </div>
            <div className="official-solution">
              <h3 style={{color: '#000', fontWeight: '600'}}>Solución Oficial:</h3>
              <p style={{color: '#000', fontWeight: '500'}}>{solution}</p>
            </div>
            <button className="btn" onClick={onClose}>Continuar</button>
          </>
        ) : (
          <>
            <h2 className="error-title">🔍 Solución Incorrecta</h2>
            <div className="error-message">
              <p style={{color: '#000', fontWeight: '500'}}>Tu respuesta no es correcta. Revisa las evidencias y pistas nuevamente.</p>
            </div>
            <div className="button-group">
              <button className="btn" onClick={onClose}>Intentar de Nuevo</button>
              {onShowSolution && (
                <button className="btn btn-secondary" onClick={() => { onShowSolution(); onClose(); }}>
                  Ver Solución
                </button>
              )}
            </div>
          </>
        )}

        <style jsx>{`
          .result-modal {
            text-align: center;
          }

          .success-title {
            color: #4CAF50;
            margin-bottom: 20px;
            font-size: 2em;
            font-weight: 700;
          }

          .error-title {
            color: #F44336;
            margin-bottom: 20px;
            font-size: 2em;
            font-weight: 700;
          }

          .user-solution {
            background: #E8F5E8;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
            text-align: left;
          }

          .user-solution h3 {
            margin-top: 0;
            text-align: center;
          }

          .official-solution {
            background: #F0F8FF;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
            text-align: left;
          }

          .official-solution h3 {
            margin-top: 0;
            text-align: center;
          }

          .error-message {
            background: #FFEBEE;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
          }

          .button-group {
            display: flex;
            gap: 10px;
            justify-content: center;
            flex-wrap: wrap;
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

          @media (max-width: 768px) {
            .button-group {
              flex-direction: column;
            }
          }
        `}</style>
      </div>
    </Modal>
  );
}