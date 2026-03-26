import { useCallback } from 'react';
import useStore from '../store';

interface CanvasContextMenuProps {
  x: number;
  y: number;
  flowPosition: { x: number; y: number };
  onClose: () => void;
}

export default function CanvasContextMenu({ x, y, flowPosition, onClose }: CanvasContextMenuProps) {
  const addDeclarationToDiagram = useStore((state) => state.addDeclarationToDiagram);

  const handleAddConcept = useCallback(() => {
    addDeclarationToDiagram('Concept', flowPosition);
    onClose();
  }, [addDeclarationToDiagram, flowPosition, onClose]);

  const handleAddEnum = useCallback(() => {
    addDeclarationToDiagram('Enum', flowPosition);
    onClose();
  }, [addDeclarationToDiagram, flowPosition, onClose]);

  const menuItemStyle: React.CSSProperties = {
    padding: '8px 20px',
    cursor: 'pointer',
    fontSize: '0.82rem',
    color: '#050C40',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    transition: 'all 0.15s ease',
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        zIndex: 1000,
        background: '#ffffff',
        border: '1px solid rgba(5, 12, 64, 0.1)',
        borderRadius: 10,
        boxShadow: '0 4px 20px rgba(5, 12, 64, 0.15)',
        padding: '6px 0',
        minWidth: 180,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
      }}
    >
      <div
        style={menuItemStyle}
        onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(25, 198, 199, 0.08)'; e.currentTarget.style.color = '#19C6C7'; }}
        onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#050C40'; }}
        onClick={handleAddConcept}
      >
        <i className="fas fa-cube" style={{fontSize: '0.75rem', opacity: 0.6}}></i>
        Add Concept
      </div>
      <div
        style={menuItemStyle}
        onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(25, 198, 199, 0.08)'; e.currentTarget.style.color = '#19C6C7'; }}
        onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#050C40'; }}
        onClick={handleAddEnum}
      >
        <i className="fas fa-list" style={{fontSize: '0.75rem', opacity: 0.6}}></i>
        Add Enum
      </div>
    </div>
  );
}
