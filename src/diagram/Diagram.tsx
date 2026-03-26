import { useMemo, useState, useCallback, useRef } from 'react';
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  useReactFlow,
  ReactFlowProvider,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import './Diagram.css';

import useStore from '../store';
import ConceptNode from './ConceptNode';
import EnumNode from './EnumNode';
import MapNode from './MapNode';
import ScalarNode from './ScalarNode';
import FloatingEdge from './FloatingEdge';
import CanvasContextMenu from './CanvasContextMenu';

function DiagramInner() {
  const nodeTypes = useMemo(() => ({ concept: ConceptNode, enum: EnumNode, map: MapNode, scalar: ScalarNode }), []);
  const edgeTypes = useMemo(() => ({ floating: FloatingEdge }), []);
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const onNodesChange = useStore((state) => state.onNodesChange);
  const onEdgesChange = useStore((state) => state.onEdgesChange);
  const onConnect = useStore((state) => state.onConnect);

  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; flowPosition: { x: number; y: number } } | null>(null);
  const reactFlowInstance = useReactFlow();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const onPaneContextMenu = useCallback((event: React.MouseEvent | MouseEvent) => {
    event.preventDefault();
    const bounds = wrapperRef.current?.getBoundingClientRect();
    const x = (event as MouseEvent).clientX - (bounds?.left ?? 0);
    const y = (event as MouseEvent).clientY - (bounds?.top ?? 0);
    const flowPosition = reactFlowInstance.screenToFlowPosition({ x: (event as MouseEvent).clientX, y: (event as MouseEvent).clientY });
    setContextMenu({ x, y, flowPosition });
  }, [reactFlowInstance]);

  const onPaneClick = useCallback(() => {
    setContextMenu(null);
  }, []);

  return (
    <div className='diagram' ref={wrapperRef}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onPaneClick={onPaneClick}
        onContextMenu={onPaneContextMenu}
      >
        <MiniMap />
        <Controls />
        <Background variant={BackgroundVariant.Lines} />
      </ReactFlow>
      {contextMenu && (
        <CanvasContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          flowPosition={contextMenu.flowPosition}
          onClose={() => setContextMenu(null)}
        />
      )}
    </div>
  );
}

function Diagram() {
  return (
    <ReactFlowProvider>
      <DiagramInner />
    </ReactFlowProvider>
  );
}

export default Diagram;
