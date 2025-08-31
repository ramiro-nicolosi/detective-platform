'use client';

import { memo, useCallback } from 'react';
import { Evidence } from '@/types/detective';
import LazyImage from './LazyImage';
import { useWindowManager } from './WindowManager';

interface EvidenceListProps {
  evidence: Evidence[];
}

const EvidenceList = memo(function EvidenceList({ evidence }: EvidenceListProps) {
  const { openWindow } = useWindowManager();

  const handleOpenEvidence = useCallback((item: Evidence, index: number) => {
    openWindow({
      id: `evidence-${index}`,
      title: `Evidencia: ${item.name}`,
      children: (
        <div className="evidence-modal-content">
          {item.photo && (
            <div className="evidence-modal-image">
              <LazyImage 
                src={item.photo} 
                alt={item.name} 
                style={{ 
                  width: '100%', 
                  height: '300px', 
                  objectFit: 'cover',
                  borderRadius: '12px'
                }} 
              />
            </div>
          )}
          <div className="evidence-modal-info">
            <div className="info-item">
              <span className="info-icon">📁</span>
              <span className="info-label">Archivo:</span>
              <span className="info-value">{item.file}</span>
            </div>
            <div className="info-item">
              <span className="info-icon">📊</span>
              <span className="info-label">Tipo:</span>
              <span className="info-value">{item.type}</span>
            </div>
            <div className="info-item">
              <span className="info-icon">⚠️</span>
              <span className="info-label">Importancia:</span>
              <span className={`info-value importance-${item.importance}`}>
                {item.importance.toUpperCase()}
              </span>
            </div>
          </div>
          <div className="evidence-modal-analysis">
            <div className="analysis-header">
              <span className="analysis-icon">🔍</span>
              <h4>ANÁLISIS DE EVIDENCIA</h4>
            </div>
            <div className="analysis-content">
              <div className="analysis-section">
                <div className="analysis-label">Archivo:</div>
                <div className="analysis-value">{item.file}</div>
              </div>
              <div className="analysis-section">
                <div className="analysis-label">Tipo:</div>
                <div className="analysis-value">{item.type}</div>
              </div>
              <div className="analysis-section">
                <div className="analysis-label">Estado:</div>
                <div className="analysis-value status-processed">PROCESADO</div>
              </div>
              <div className="analysis-divider"></div>
              <div className="analysis-section">
                <div className="analysis-label">CONTENIDO:</div>
                <div className="analysis-description">{item.description}</div>
              </div>
            </div>
          </div>
          
          <style jsx>{`
            .evidence-modal-content {
              padding: 0;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }

            .evidence-modal-image {
              margin-bottom: 24px;
            }

            .evidence-modal-info {
              background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
              padding: 20px;
              border-radius: 12px;
              margin-bottom: 24px;
              border: 1px solid #dee2e6;
            }

            .info-item {
              display: flex;
              align-items: center;
              gap: 10px;
              margin-bottom: 12px;
              font-size: 15px;
            }

            .info-item:last-child {
              margin-bottom: 0;
            }

            .info-icon {
              font-size: 18px;
              width: 24px;
              display: flex;
              justify-content: center;
            }

            .info-label {
              font-weight: 600;
              color: #495057;
              min-width: 90px;
            }

            .info-value {
              color: #212529;
              font-weight: 500;
              flex: 1;
            }

            .importance-high {
              color: #dc3545 !important;
              font-weight: 700;
            }

            .importance-medium {
              color: #fd7e14 !important;
              font-weight: 700;
            }

            .importance-low {
              color: #28a745 !important;
              font-weight: 700;
            }

            .evidence-modal-analysis {
              background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            }

            .analysis-header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              padding: 16px 20px;
              display: flex;
              align-items: center;
              gap: 12px;
            }

            .analysis-icon {
              font-size: 20px;
            }

            .analysis-header h4 {
              margin: 0;
              color: white;
              font-size: 16px;
              font-weight: 600;
              letter-spacing: 0.5px;
            }

            .analysis-content {
              padding: 20px;
              color: #ecf0f1;
            }

            .analysis-section {
              margin-bottom: 16px;
              display: flex;
              align-items: flex-start;
              gap: 12px;
            }

            .analysis-section:last-child {
              margin-bottom: 0;
            }

            .analysis-label {
              color: #3498db;
              font-weight: 600;
              min-width: 80px;
              font-size: 14px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }

            .analysis-value {
              color: #2ecc71;
              font-weight: 500;
              font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
              flex: 1;
            }

            .status-processed {
              color: #e74c3c !important;
              font-weight: 700;
            }

            .analysis-description {
              color: #ecf0f1;
              line-height: 1.6;
              font-size: 15px;
              margin-top: 8px;
              padding: 16px;
              background: rgba(52, 73, 94, 0.5);
              border-radius: 8px;
              border-left: 4px solid #3498db;
            }

            .analysis-divider {
              height: 1px;
              background: linear-gradient(90deg, transparent 0%, #3498db 50%, transparent 100%);
              margin: 20px 0;
            }
          `}</style>
        </div>
      ),
      width: 700,
      height: 600
    });
  }, [openWindow]);
  return (
    <div className="evidence-list">
      {evidence.map((item, index) => (
        <div key={index} className="evidence-item">
          <div className="evidence-header">
            <div className="evidence-icon">{item.icon}</div>
            <div className="flex-1">
              <h4 className="evidence-title">{item.name}</h4>
              <div className="evidence-type">{item.type}</div>
            </div>
            <span className={`evidence-tag tag-${item.importance}`}>
              {item.importance.toUpperCase()}
            </span>
          </div>
          
          {item.photo && (
            <div className="evidence-photo">
              <LazyImage src={item.photo} alt={item.name} />
            </div>
          )}
          
          <div className="evidence-file" onClick={() => handleOpenEvidence(item, index)}>
            <div className="file-name">📁 {item.file}</div>
            <div className="file-instruction">Clic para examinar evidencia</div>
          </div>
          
          <p className="mt-2 mb-0">{item.description}</p>
        </div>
      ))}

      <style jsx>{`
        .evidence-item {
          background: white;
          padding: 20px;
          border-radius: 12px;
          margin-bottom: 20px;
          border: 1px solid #ddd;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }

        .evidence-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 15px;
        }

        .evidence-icon {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #FF6B6B, #4ECDC4);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 24px;
          flex-shrink: 0;
        }

        .flex-1 {
          flex: 1;
        }

        .evidence-file {
          background: #f8f9fa;
          border: 2px dashed #ddd;
          border-radius: 8px;
          padding: 20px;
          text-align: center;
          margin: 15px 0;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .evidence-file:hover {
          border-color: #667eea;
          background: #f0f8ff;
        }

        .evidence-tag {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 15px;
          font-size: 12px;
          font-weight: bold;
          margin: 5px 5px 0 0;
        }

        .tag-critical { background: #FFEBEE; color: #F44336; }
        .tag-high { background: #FFF3E0; color: #FF9800; }
        .tag-medium { background: #E3F2FD; color: #2196F3; }
        .tag-low { background: #E8F5E8; color: #4CAF50; }

        .evidence-photo {
          width: 100%;
          height: 200px;
          border-radius: 8px;
          overflow: hidden;
          margin: 15px 0;
          border: 1px solid #ddd;
        }

        .evidence-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .evidence-title {
          margin: 0;
          font-size: 18px;
          font-weight: bold;
          color: #1a1a1a;
        }

        .evidence-type {
          color: #424242;
          font-size: 14px;
          font-weight: 500;
          text-transform: capitalize;
        }

        .file-name {
          font-weight: bold;
          margin-bottom: 5px;
          color: #333;
        }

        .file-instruction {
          color: #555;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
});

export default EvidenceList;