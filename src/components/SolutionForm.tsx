'use client';

import { useState } from 'react';
import { Suspect } from '@/types/detective';

interface SolutionFormProps {
  suspects: Suspect[];
  onSubmit: (culprit: string, method: string, motive: string) => void;
}

export default function SolutionForm({ suspects, onSubmit }: SolutionFormProps) {
  const [culprit, setCulprit] = useState('');
  const [method, setMethod] = useState('');
  const [motive, setMotive] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!culprit || !method || !motive) {
      alert('Por favor completa todos los campos de la solución');
      return;
    }
    onSubmit(culprit, method, motive);
  };

  return (
    <div className="solution-form">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>¿Quién es el culpable?</label>
          <select 
            value={culprit} 
            onChange={(e) => setCulprit(e.target.value)}
          >
            <option value="">Selecciona un sospechoso</option>
            {suspects.map((suspect, index) => (
              <option key={index} value={suspect.name}>
                {suspect.name}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <label>¿Cómo lo hizo?</label>
          <textarea
            rows={3}
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            placeholder="Explica el método utilizado"
          />
        </div>
        <div className="input-group">
          <label>¿Cuál fue el motivo?</label>
          <textarea
            rows={3}
            value={motive}
            onChange={(e) => setMotive(e.target.value)}
            placeholder="Explica el motivo del crimen"
          />
        </div>
        <button type="submit" className="btn">
          Enviar Solución
        </button>
      </form>

      <style jsx>{`
        .solution-form {
          background: #f0f8ff;
          padding: 20px;
          border-radius: 8px;
          margin-top: 20px;
        }

        .input-group {
          margin-bottom: 20px;
        }

        .input-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
          color: #555;
        }

        .input-group input,
        .input-group select,
        .input-group textarea {
          width: 100%;
          padding: 12px;
          border: 2px solid #ddd;
          border-radius: 8px;
          font-size: 16px;
          transition: border-color 0.3s ease;
          box-sizing: border-box;
          font-family: inherit;
        }

        .input-group input:focus,
        .input-group select:focus,
        .input-group textarea:focus {
          outline: none;
          border-color: #667eea;
        }

        .input-group textarea {
          resize: vertical;
          min-height: 80px;
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
      `}</style>
    </div>
  );
}