'use client';

import { useState } from 'react';
import { Suspect } from '@/types/detective';

interface EnhancedSolutionFormProps {
  suspects: Suspect[];
  onSubmit: (solution: SolutionData) => void;
}

export interface SolutionData {
  culprit: string;
  method: string;
  motive: string;
  timeline: string;
  evidence: string[];
  confidence: number;
}

export default function EnhancedSolutionForm({ suspects, onSubmit }: EnhancedSolutionFormProps) {
  const [culprit, setCulprit] = useState('');
  const [method, setMethod] = useState('');
  const [motive, setMotive] = useState('');
  const [timeline, setTimeline] = useState('');
  const [selectedEvidence, setSelectedEvidence] = useState<string[]>([]);
  const [confidence, setConfidence] = useState(50);

  const evidenceOptions = [
    'Grabación CCTV',
    'Huella Dactilar',
    'Candelabro - Arma del Crimen',
    'Carta Amenazante',
    'Análisis Digital',
    'Muestra de Sangre'
  ];

  const handleEvidenceToggle = (evidence: string) => {
    setSelectedEvidence(prev => 
      prev.includes(evidence) 
        ? prev.filter(e => e !== evidence)
        : [...prev, evidence]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!culprit || !method || !motive || !timeline) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    const solution: SolutionData = {
      culprit,
      method,
      motive,
      timeline,
      evidence: selectedEvidence,
      confidence
    };

    onSubmit(solution);
  };

  const getConfidenceLabel = (value: number) => {
    if (value < 30) return 'Muy Baja';
    if (value < 50) return 'Baja';
    if (value < 70) return 'Media';
    if (value < 90) return 'Alta';
    return 'Muy Alta';
  };

  const getConfidenceColor = (value: number) => {
    if (value < 30) return '#f44336';
    if (value < 50) return '#ff9800';
    if (value < 70) return '#2196f3';
    if (value < 90) return '#4caf50';
    return '#8bc34a';
  };

  return (
    <div className="enhanced-solution-form">
      <div className="form-header">
        <h3>Presenta tu Solución del Caso</h3>
        <p>Utiliza toda la evidencia recolectada para resolver el misterio</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="input-group">
            <label>
              <span className="required">*</span> ¿Quién es el culpable?
            </label>
            <select 
              value={culprit} 
              onChange={(e) => setCulprit(e.target.value)}
              required
            >
              <option value="">Selecciona un sospechoso</option>
              {suspects.map((suspect, index) => (
                <option key={index} value={suspect.name}>
                  {suspect.name} - {suspect.role}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label>
              <span className="required">*</span> ¿Cómo lo hizo? (Método)
            </label>
            <textarea
              rows={4}
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              placeholder="Describe detalladamente cómo se cometió el crimen..."
              required
            />
          </div>

          <div className="input-group">
            <label>
              <span className="required">*</span> ¿Cuál fue el motivo?
            </label>
            <textarea
              rows={4}
              value={motive}
              onChange={(e) => setMotive(e.target.value)}
              placeholder="Explica las razones que llevaron al culpable a cometer el crimen..."
              required
            />
          </div>

          <div className="input-group">
            <label>
              <span className="required">*</span> Línea de Tiempo
            </label>
            <textarea
              rows={3}
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
              placeholder="Describe la secuencia cronológica de los eventos..."
              required
            />
          </div>

          <div className="input-group full-width">
            <label>Evidencias que respaldan tu solución</label>
            <div className="evidence-checklist">
              {evidenceOptions.map((evidence) => (
                <label key={evidence} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedEvidence.includes(evidence)}
                    onChange={() => handleEvidenceToggle(evidence)}
                  />
                  <span className="checkmark"></span>
                  {evidence}
                </label>
              ))}
            </div>
          </div>

          <div className="input-group full-width">
            <label>
              Nivel de Confianza: {confidence}% - {getConfidenceLabel(confidence)}
            </label>
            <div className="confidence-slider">
              <input
                type="range"
                min="0"
                max="100"
                value={confidence}
                onChange={(e) => setConfidence(Number(e.target.value))}
                style={{ '--confidence-color': getConfidenceColor(confidence) } as React.CSSProperties}
              />
              <div className="confidence-labels">
                <span>0% - Sin Certeza</span>
                <span>100% - Completamente Seguro</span>
              </div>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <div className="solution-summary">
            <h4>Resumen de tu Solución:</h4>
            <div className="summary-grid">
              <div><strong>Culpable:</strong> {culprit || 'No seleccionado'}</div>
              <div><strong>Evidencias:</strong> {selectedEvidence.length} seleccionadas</div>
              <div><strong>Confianza:</strong> {confidence}%</div>
            </div>
          </div>
          <button type="submit" className="submit-btn">
            🔍 Revelar Solución
          </button>
        </div>
      </form>

      <style jsx>{`
        .enhanced-solution-form {
          background: linear-gradient(135deg, #f0f8ff 0%, #e6f3ff 100%);
          padding: 30px;
          border-radius: 12px;
          margin-top: 20px;
          border: 2px solid #667eea;
        }

        .form-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .form-header h3 {
          color: #667eea;
          margin-bottom: 10px;
          font-size: 1.8em;
        }

        .form-header p {
          color: #424242;
          font-style: italic;
          font-weight: 500;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 30px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
        }

        .input-group.full-width {
          grid-column: 1 / -1;
        }

        .input-group label {
          margin-bottom: 8px;
          font-weight: bold;
          color: #1a1a1a;
          font-size: 15px;
        }

        .required {
          color: #f44336;
          margin-right: 5px;
        }

        .input-group input,
        .input-group select,
        .input-group textarea {
          padding: 12px;
          border: 2px solid #ddd;
          border-radius: 8px;
          font-size: 14px;
          transition: border-color 0.3s ease;
          font-family: inherit;
          resize: vertical;
        }

        .input-group input:focus,
        .input-group select:focus,
        .input-group textarea:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .evidence-checklist {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 10px;
          padding: 15px;
          background: white;
          border-radius: 8px;
          border: 1px solid #ddd;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          font-size: 14px;
        }

        .checkbox-label:hover {
          background: #f0f8ff;
        }

        .checkbox-label input[type="checkbox"] {
          margin: 0;
          width: 18px;
          height: 18px;
        }

        .confidence-slider {
          position: relative;
        }

        .confidence-slider input[type="range"] {
          width: 100%;
          height: 8px;
          border-radius: 4px;
          background: #ddd;
          outline: none;
          -webkit-appearance: none;
        }

        .confidence-slider input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--confidence-color);
          cursor: pointer;
        }

        .confidence-labels {
          display: flex;
          justify-content: space-between;
          margin-top: 5px;
          font-size: 12px;
          color: #424242;
          font-weight: 500;
        }

        .form-actions {
          border-top: 2px solid #eee;
          padding-top: 20px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 20px;
        }

        .solution-summary {
          flex: 1;
          background: white;
          padding: 20px;
          border-radius: 8px;
          border: 1px solid #ddd;
        }

        .solution-summary h4 {
          margin: 0 0 15px 0;
          color: #667eea;
        }

        .summary-grid {
          display: grid;
          gap: 8px;
          font-size: 14px;
        }

        .submit-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 15px 30px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 16px;
          font-weight: bold;
          transition: all 0.3s ease;
          min-width: 200px;
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        }

        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
          
          .form-actions {
            flex-direction: column;
            align-items: stretch;
          }
          
          .submit-btn {
            min-width: auto;
          }
        }
      `}</style>
    </div>
  );
}