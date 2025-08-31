'use client';

import { useState, useCallback, useMemo, memo } from 'react';
import { Suspect, ChatMessage } from '@/types/detective';
import LazyImage from './LazyImage';

interface SuspectChatProps {
  suspect: Suspect;
  onUpdateSuspect: (updatedSuspect: Suspect) => void;
  onClose: () => void;
}

const SuspectChat = memo(function SuspectChat({ suspect, onUpdateSuspect, onClose }: SuspectChatProps) {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const generateResponse = useCallback((userMessage: string): string => {
    const lowercaseMessage = userMessage.toLowerCase();
    const { aiPersonality } = suspect;
    
    // Check for specific keywords and reactions
    for (const keyword of aiPersonality.keywords) {
      if (lowercaseMessage.includes(keyword.toLowerCase())) {
        const reactions = aiPersonality.reactions[keyword];
        if (reactions && reactions.length > 0) {
          const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
          return randomReaction;
        }
      }
    }
    
    // General responses based on personality traits
    if (lowercaseMessage.includes('culpable') || lowercaseMessage.includes('guilty')) {
      if (aiPersonality.nervousness > 0.7) {
        return "¿Culpable? ¡Yo no... yo no hice nada! ¿Por qué me preguntas eso?";
      } else if (aiPersonality.cooperation < 0.3) {
        return "No tengo que responder a esas acusaciones sin mi abogado.";
      } else {
        return "No soy culpable de nada. Solo estaba haciendo mi trabajo.";
      }
    }
    
    if (lowercaseMessage.includes('donde') || lowercaseMessage.includes('when') || lowercaseMessage.includes('cuándo')) {
      if (aiPersonality.truthfulness > 0.8) {
        return `Como ya dije, ${suspect.alibi}. Puedes verificarlo si quieres.`;
      } else if (aiPersonality.nervousness > 0.6) {
        return "Eh... ya te lo dije antes, ¿no? No recuerdo exactamente...";
      } else {
        return suspect.alibi;
      }
    }
    
    if (lowercaseMessage.includes('por qué') || lowercaseMessage.includes('why')) {
      if (aiPersonality.cooperation > 0.7) {
        return "Entiendo tu curiosidad, detective. Estoy aquí para ayudar en lo que pueda.";
      } else {
        return "¿Por qué tendría que explicarte mis acciones? No he hecho nada malo.";
      }
    }
    
    // Default responses based on personality
    const responses = [];
    
    if (aiPersonality.traits.includes('nervous')) {
      responses.push(
        "No sé qué más decirte...",
        "¿Podemos terminar pronto? Esto me pone nervioso.",
        "Solo quiero que esto termine ya."
      );
    }
    
    if (aiPersonality.traits.includes('cooperative')) {
      responses.push(
        "Estoy aquí para ayudar en todo lo que pueda.",
        "Por supuesto, detective. ¿Qué más quiere saber?",
        "Haré todo lo posible para colaborar con la investigación."
      );
    }
    
    if (aiPersonality.traits.includes('defensive')) {
      responses.push(
        "No entiendo por qué me están interrogando a mí.",
        "Ya les he dicho todo lo que sé.",
        "¿No deberían estar buscando al verdadero culpable?"
      );
    }
    
    if (aiPersonality.traits.includes('suspicious')) {
      responses.push(
        "Hay cosas que no puedo decir...",
        "No todo es lo que parece, detective.",
        "Tal vez deberían investigar más a fondo."
      );
    }
    
    // Fallback responses
    if (responses.length === 0) {
      responses.push(
        "No estoy seguro de cómo responder a eso.",
        "Tendría que pensarlo más.",
        "¿Podrías ser más específico con tu pregunta?"
      );
    }
    
    return responses[Math.floor(Math.random() * responses.length)];
  }, [suspect]);

  const handleSendMessage = useCallback(async () => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date()
    };

    const updatedChatHistory = [...suspect.chatHistory, userMessage];
    
    // Update suspect with user message
    const updatedSuspect = {
      ...suspect,
      chatHistory: updatedChatHistory
    };
    onUpdateSuspect(updatedSuspect);

    setMessage('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const aiResponse = generateResponse(message);
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };

      const finalUpdatedSuspect = {
        ...updatedSuspect,
        chatHistory: [...updatedChatHistory, aiMessage]
      };
      
      onUpdateSuspect(finalUpdatedSuspect);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  }, [message, suspect, onUpdateSuspect, generateResponse]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  // Memoizar la lista de mensajes para evitar re-renders
  const chatMessages = useMemo(() => 
    suspect.chatHistory.map((msg) => (
      <div key={msg.id} className={`message ${msg.sender === 'user' ? 'user-message' : 'ai-message'}`}>
        <div className="message-content">
          <strong>{msg.sender === 'user' ? 'Detective:' : `${suspect.name}:`}</strong>
          <p>{msg.content}</p>
        </div>
        <div className="message-time">
          {msg.timestamp.toLocaleTimeString()}
        </div>
      </div>
    )), [suspect.chatHistory, suspect.name]
  );

  return (
    <div className="suspect-chat">
      <div className="chat-header">
        <div className="suspect-info">
          <div className="suspect-avatar">
            <LazyImage src={suspect.photo} alt={suspect.name} />
          </div>
          <div>
            <h3>{suspect.name}</h3>
            <p>{suspect.role}</p>
          </div>
        </div>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>

      <div className="chat-messages">
        {suspect.chatHistory.length === 0 && (
          <div className="welcome-message">
            <p><strong>{suspect.name}:</strong> Hola, detective. ¿En qué puedo ayudarle con la investigación?</p>
          </div>
        )}
        
        {chatMessages}
        
        {isTyping && (
          <div className="ai-message typing">
            <div className="message-content">
              <strong>{suspect.name}:</strong>
              <p>
                <span className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
                está escribiendo...
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="chat-input">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Escriba su pregunta para el sospechoso..."
          disabled={isTyping}
        />
        <button 
          onClick={handleSendMessage} 
          disabled={!message.trim() || isTyping}
          className="send-btn"
        >
          Enviar
        </button>
      </div>

      <style jsx>{`
        .suspect-chat {
          display: flex;
          flex-direction: column;
          height: 600px;
          background: white;
          border-radius: 12px;
          overflow: hidden;
        }

        .chat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          background: #667eea;
          color: white;
        }

        .suspect-info {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .suspect-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .suspect-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .suspect-info h3 {
          margin: 0;
          font-size: 1.4em;
        }

        .suspect-info p {
          margin: 0;
          opacity: 0.9;
        }

        .close-btn {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          border-radius: 50%;
          width: 35px;
          height: 35px;
          cursor: pointer;
          color: white;
          font-size: 18px;
        }

        .close-btn:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 15px;
          background: linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%);
        }

        .welcome-message {
          background: #f0f8ff;
          padding: 15px;
          border-radius: 8px;
          border-left: 4px solid #667eea;
          color: #2c3e50;
          font-weight: 500;
        }

        .welcome-message p {
          margin: 0;
          line-height: 1.5;
        }

        .message {
          display: flex;
          flex-direction: column;
        }

        .user-message {
          align-items: flex-end;
        }

        .ai-message {
          align-items: flex-start;
        }

        .message-content {
          max-width: 70%;
          padding: 14px 18px;
          border-radius: 12px;
          margin-bottom: 5px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          font-size: 15px;
        }

        .user-message .message-content {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          box-shadow: 0 2px 12px rgba(102, 126, 234, 0.3);
        }

        .ai-message .message-content {
          background: white;
          color: #2c3e50;
          border: 1px solid #e9ecef;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        .message-content strong {
          font-size: 0.85em;
          font-weight: 600;
          display: block;
          margin-bottom: 6px;
        }

        .user-message .message-content strong {
          color: rgba(255, 255, 255, 0.9);
        }

        .ai-message .message-content strong {
          color: #667eea;
        }

        .message-content p {
          margin: 0;
          line-height: 1.5;
          font-weight: 500;
        }

        .message-time {
          font-size: 0.8em;
          color: #8e9aaf;
          padding: 0 18px;
          font-weight: 500;
          margin-bottom: 8px;
        }

        .typing {
          opacity: 0.8;
        }

        .typing .message-content {
          background: #f8f9fa;
          color: #6c757d;
          border: 1px solid #dee2e6;
        }

        .typing-indicator {
          display: inline-flex;
          gap: 4px;
          margin-right: 8px;
          align-items: center;
        }

        .typing-indicator span {
          width: 8px;
          height: 8px;
          background: #667eea;
          border-radius: 50%;
          animation: typing 1.4s infinite ease-in-out;
        }

        .typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }

        .typing-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes typing {
          0%, 80%, 100% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .chat-input {
          display: flex;
          gap: 12px;
          padding: 20px;
          background: white;
          border-top: 1px solid #e9ecef;
          box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
        }

        .chat-input textarea {
          flex: 1;
          padding: 14px 16px;
          border: 2px solid #e9ecef;
          border-radius: 12px;
          resize: none;
          height: 60px;
          font-family: inherit;
          font-size: 15px;
          color: #2c3e50;
          transition: all 0.3s ease;
          background: #f8f9fa;
        }

        .chat-input textarea:focus {
          outline: none;
          border-color: #667eea;
          background: white;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .chat-input textarea::placeholder {
          color: #8e9aaf;
          font-weight: 500;
        }

        .send-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 14px 28px;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 600;
          font-size: 15px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
          min-width: 80px;
        }

        .send-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, #5a6fd8 0%, #6a4c9e 100%);
          box-shadow: 0 6px 16px rgba(102, 126, 234, 0.3);
          transform: translateY(-2px);
        }

        .send-btn:disabled {
          background: #cbd5e0;
          cursor: not-allowed;
          box-shadow: none;
          transform: none;
        }

        @media (max-width: 768px) {
          .suspect-chat {
            height: 80vh;
          }

          .message-content {
            max-width: 85%;
            font-size: 14px;
            padding: 12px 14px;
          }

          .chat-input {
            padding: 15px;
            gap: 10px;
          }

          .chat-input textarea {
            height: 50px;
            font-size: 14px;
            padding: 12px 14px;
          }

          .send-btn {
            padding: 12px 20px;
            font-size: 14px;
            min-width: 70px;
          }

          .chat-header {
            padding: 15px;
          }

          .suspect-info h3 {
            font-size: 1.2em;
          }

          .suspect-avatar {
            width: 45px;
            height: 45px;
          }
        }
      `}</style>
    </div>
  );
});

export default SuspectChat;