'use client';

import { memo } from 'react';

interface AuthFormProps {
  onLogin: () => void;
}

const AuthForm = memo(function AuthForm({ onLogin }: AuthFormProps) {
  return (
    <div className="auth-container">
      <h2 className="text-2xl text-center mb-8 font-bold">🕵️ Detective Platform</h2>
      <p className="auth-subtitle">Accede para comenzar a resolver misterios</p>
      
      <button 
        onClick={onLogin}
        className="google-button"
      >
        <svg 
          className="google-icon" 
          viewBox="0 0 24 24" 
          width="20" 
          height="20"
        >
          <path 
            fill="#4285F4" 
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path 
            fill="#34A853" 
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path 
            fill="#FBBC05" 
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path 
            fill="#EA4335" 
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Continuar con Google
      </button>

      <div className="features-list">
        <div className="feature-item">
          <span className="feature-icon">🤖</span>
          <span>Interroga sospechosos con IA</span>
        </div>
        <div className="feature-item">
          <span className="feature-icon">🔍</span>
          <span>Analiza evidencias detalladamente</span>
        </div>
        <div className="feature-item">
          <span className="feature-icon">🏆</span>
          <span>Guarda tu progreso y logros</span>
        </div>
      </div>

      <style jsx>{`
        .auth-container {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1), 0 8px 20px rgba(102,126,234,0.15);
          border: 1px solid rgba(255, 255, 255, 0.2);
          text-align: center;
          max-width: 450px;
          margin: 0 auto;
        }

        .auth-subtitle {
          color: #666;
          margin-bottom: 30px;
          font-size: 1.1em;
        }

        .google-button {
          width: 100%;
          padding: 16px 24px;
          background: white;
          color: #333;
          border: 2px solid #ddd;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 30px;
        }

        .google-button:hover {
          background: #f8f9fa;
          border-color: #4285F4;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(66, 133, 244, 0.2);
        }

        .google-icon {
          flex-shrink: 0;
        }

        .features-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          text-align: left;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 0;
          color: #555;
          font-size: 14px;
          font-weight: 500;
        }

        .feature-icon {
          font-size: 16px;
          width: 20px;
          text-align: center;
        }

        @media (max-width: 768px) {
          .auth-container {
            margin: 20px;
            padding: 30px 25px;
          }
        }
      `}</style>
    </div>
  );
});

export default AuthForm;