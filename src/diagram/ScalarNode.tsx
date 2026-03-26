import { Handle, Position } from '@xyflow/react';
import { colors, getStereotype } from '../theme';
import { ScalarNodeData } from '../types';

import './Node.css';

function getScalarBaseType(declClass: string): string {
    const lastDot = declClass.lastIndexOf('.');
    const name = declClass.substring(lastDot + 1);
    return name.replace('Scalar', '');
}

export default function ScalarNode({ data }: { data: ScalarNodeData }) {
    const declaration = data.declaration;
    const stereotype = getStereotype(declaration.$class);
    return (
        <>
            <Handle type='target' position={Position.Bottom} />
            <Handle type='source' position={Position.Top} />
            <div className='Node'>
                <div className='header' style={{ backgroundColor: colors[declaration.$class] ?? '#b5d8f7' }}>
                    {stereotype && <div className='Stereotype'>{stereotype}</div>}
                    <div className='DeclarationName'>{declaration.name}</div>
                </div>
                <div>
                    <table className='properties'>
                        <tbody>
                            <tr>
                                <td>extends</td>
                                <td className='type'>{getScalarBaseType(declaration.$class)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='footer'>
                </div>
            </div>
        </>
    );
}
