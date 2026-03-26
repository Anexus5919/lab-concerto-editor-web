import { getBezierPath, EdgeText, useInternalNode, type EdgeProps } from '@xyflow/react';
import { getEdgeParams } from '../diagramUtil';

const edgeStyles: Record<string, { stroke: string; strokeDasharray?: string; fill: string }> = {
  property:     { stroke: '#5c6bc0', fill: '#5c6bc0' },
  relationship: { stroke: '#19C6C7', strokeDasharray: '8 4', fill: '#19C6C7' },
  superType:    { stroke: '#1B2540', fill: '#1B2540' },
  enumRef:      { stroke: '#ab47bc', strokeDasharray: '3 3', fill: '#ab47bc' },
};

const markerIds: Record<string, string> = {
  property: 'marker-arrow-filled',
  relationship: 'marker-arrow-open',
  superType: 'marker-triangle',
  enumRef: 'marker-arrow-filled-enum',
};

function FloatingEdge({ id, source, target, markerEnd, style, label, data }: EdgeProps) {
  const sourceNode = useInternalNode(source);
  const targetNode = useInternalNode(target);

  if (!sourceNode || !targetNode) {
    return null;
  }

  const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(sourceNode, targetNode);

  const [d, labelX, labelY] = getBezierPath({
    sourceX: sx,
    sourceY: sy,
    sourcePosition: sourcePos,
    targetPosition: targetPos,
    targetX: tx,
    targetY: ty,
  });

  const edgeType = (data?.type as string) ?? 'property';
  const es = edgeStyles[edgeType] ?? edgeStyles.property;

  return (
    <g className="react-flow__connection">
      <defs>
        <marker id="marker-arrow-filled" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#5c6bc0" />
        </marker>
        <marker id="marker-arrow-open" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10" fill="none" stroke="#19C6C7" strokeWidth="1.5" />
        </marker>
        <marker id="marker-triangle" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="10" markerHeight="10" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="none" stroke="#1B2540" strokeWidth="1.5" />
        </marker>
        <marker id="marker-arrow-filled-enum" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#ab47bc" />
        </marker>
      </defs>
      <path
        id={id}
        className="react-flow__edge-path"
        d={d}
        markerEnd={`url(#${markerIds[edgeType] ?? 'marker-arrow-filled'})`}
        style={{
          ...style,
          stroke: es.stroke,
          strokeWidth: 1.5,
          strokeDasharray: es.strokeDasharray,
          fill: 'none',
        }}
      />
      <EdgeText
        x={labelX}
        y={labelY}
        label={label}
        labelStyle={{ fill: '#ffffff', fontSize: '10px', fontWeight: 500 }}
        labelShowBg
        labelBgStyle={{ fill: es.fill, rx: 4, ry: 4 }}
        labelBgPadding={[4, 6]}
        labelBgBorderRadius={4}
      />
    </g>
  );
}

export default FloatingEdge;
