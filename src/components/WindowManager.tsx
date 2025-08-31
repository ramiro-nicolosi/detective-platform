'use client';

import { useState, useCallback, useEffect, memo } from 'react';
import { createPortal } from 'react-dom';

export interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
}

interface WindowState extends WindowProps {
  zIndex: number;
}

export default function WindowManager() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [maxZIndex, setMaxZIndex] = useState(1000);

  const closeWindow = useCallback((windowId: string) => {
    setWindows(prev => prev.filter(w => w.id !== windowId));
  }, []);

  const openWindow = useCallback((windowProps: Omit<WindowProps, 'isOpen' | 'onClose'>) => {
    const newWindow: WindowState = {
      ...windowProps,
      isOpen: true,
      width: windowProps.width || 600,
      height: windowProps.height || 400,
      x: windowProps.x || Math.random() * 200 + 100,
      y: windowProps.y || Math.random() * 100 + 100,
      zIndex: maxZIndex + 1,
      onClose: () => closeWindow(windowProps.id)
    };

    setWindows(prev => {
      const filtered = prev.filter(w => w.id !== windowProps.id);
      return [...filtered, newWindow];
    });
    setMaxZIndex(prev => prev + 1);
  }, [maxZIndex, closeWindow]);

  const bringToFront = useCallback((windowId: string) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, zIndex: maxZIndex + 1 } : w
    ));
    setMaxZIndex(prev => prev + 1);
  }, [maxZIndex]);

  const updateWindow = useCallback((windowId: string, updates: Partial<WindowState>) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, ...updates } : w
    ));
  }, []);

  return (
    <>
      {typeof window !== 'undefined' && 
        windows.map(windowState => 
          createPortal(
            <MovableWindow 
              key={windowState.id}
              {...windowState}
              onBringToFront={() => bringToFront(windowState.id)}
              onUpdate={(updates) => updateWindow(windowState.id, updates)}
            />,
            document.body
          )
        )
      }
      {/* Expose functions globally for use by other components */}
      {typeof window !== 'undefined' && (() => {
        (window as Window & { __windowManager?: { openWindow: typeof openWindow; closeWindow: typeof closeWindow } }).__windowManager = { openWindow, closeWindow };
        return null;
      })()}
    </>
  );
}

const MovableWindow = memo(function MovableWindow({ 
  title, 
  children, 
  width, 
  height, 
  x, 
  y, 
  zIndex, 
  onClose, 
  onBringToFront, 
  onUpdate 
}: WindowState & { 
  onBringToFront: () => void; 
  onUpdate: (updates: Partial<WindowState>) => void; 
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    onBringToFront();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - (x || 0),
      y: e.clientY - (y || 0)
    });
  }, [onBringToFront, x, y]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    onUpdate({ x: newX, y: newY });
  }, [isDragging, dragStart.x, dragStart.y, onUpdate]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div 
      className="detective-window"
      style={{
        position: 'fixed',
        left: x,
        top: y,
        width,
        height,
        zIndex,
        background: 'white',
        border: '2px solid #667eea',
        borderRadius: '12px',
        boxShadow: '0 12px 40px rgba(0,0,0,0.15), 0 4px 12px rgba(102,126,234,0.2)',
        display: 'flex',
        flexDirection: 'column'
      }}
      onClick={onBringToFront}
    >
      <div 
        className="window-header"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '12px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'move',
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '10px'
        }}
        onMouseDown={handleMouseDown}
      >
        <h3 style={{ margin: 0, fontSize: '16px' }}>{title}</h3>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          style={{
            background: 'rgba(255,255,255,0.2)',
            border: 'none',
            borderRadius: '4px',
            color: 'white',
            width: '24px',
            height: '24px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          ✕
        </button>
      </div>
      <div 
        className="window-content"
        style={{
          flex: 1,
          padding: '16px',
          overflow: 'auto'
        }}
      >
        {children}
      </div>
    </div>
  );
});

// Helper hook for components to use windows
export function useWindowManager() {
  const openWindow = useCallback((windowProps: Omit<WindowProps, 'isOpen' | 'onClose'>) => {
    if (typeof window !== 'undefined' && (window as Window & { __windowManager?: { openWindow: (props: Omit<WindowProps, 'isOpen' | 'onClose'>) => void; closeWindow: (id: string) => void } }).__windowManager) {
      (window as Window & { __windowManager?: { openWindow: (props: Omit<WindowProps, 'isOpen' | 'onClose'>) => void; closeWindow: (id: string) => void } }).__windowManager?.openWindow(windowProps);
    }
  }, []);

  const closeWindow = useCallback((windowId: string) => {
    if (typeof window !== 'undefined' && (window as Window & { __windowManager?: { openWindow: (props: Omit<WindowProps, 'isOpen' | 'onClose'>) => void; closeWindow: (id: string) => void } }).__windowManager) {
      (window as Window & { __windowManager?: { openWindow: (props: Omit<WindowProps, 'isOpen' | 'onClose'>) => void; closeWindow: (id: string) => void } }).__windowManager?.closeWindow(windowId);
    }
  }, []);

  return { openWindow, closeWindow };
}