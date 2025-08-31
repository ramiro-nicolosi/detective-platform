'use client';

import Modal from './Modal';
import { Evidence } from '@/types/detective';

interface EvidenceModalProps {
  evidence: Evidence | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function EvidenceModal({ evidence, isOpen, onClose }: EvidenceModalProps) {
  if (!evidence) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="evidence-modal">
        <div className="modal-header">
          <h2>{evidence.icon} {evidence.name}</h2>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>
        
        <div className="evidence-info">
          <p><strong>📁 Archivo:</strong> {evidence.file}</p>
          <p><strong>📊 Tipo:</strong> {evidence.type}</p>
          <p><strong>⚠️ Importancia:</strong> {evidence.importance.toUpperCase()}</p>
        </div>

        <div className="evidence-analysis">
          <div className="analysis-header">=== ANÁLISIS DE EVIDENCIA ===</div>
          <div>Archivo: {evidence.file}</div>
          <div>Tipo: {evidence.type}</div>
          <div>Estado: PROCESADO</div>
          <br />
          <div>CONTENIDO:</div>
          <div>{evidence.description}</div>
        </div>

        <button className="btn close-btn" onClick={onClose}>
          Cerrar Evidencia
        </button>

        <style jsx>{`
          .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            border-bottom: 2px solid #eee;
            padding-bottom: 15px;
          }

          .modal-header h2 {
            margin: 0;
            color: #000;
            font-size: 1.8em;
            font-weight: 700;
          }

          .close-button {
            background: #ccc;
            border: none;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            cursor: pointer;
            font-size: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.3s ease;
          }

          .close-button:hover {
            background: #bbb;
          }

          .evidence-info {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
          }

          .evidence-info p {
            margin: 8px 0;
            color: #000;
            font-weight: 500;
          }

          .evidence-analysis {
            background: #000;
            color: #00ff00;
            padding: 20px;
            font-family: 'Courier New', monospace;
            border-radius: 8px;
            margin-bottom: 20px;
            font-size: 14px;
            line-height: 1.4;
          }

          .analysis-header {
            font-weight: bold;
            margin-bottom: 10px;
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

          .close-btn {
            width: 100%;
          }
        `}</style>
      </div>
    </Modal>
  );
}