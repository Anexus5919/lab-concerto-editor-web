import { Handle, Position } from '@xyflow/react';
import { colors, getStereotype } from '../theme';
import { MapNodeData } from '../types';

import './Node.css';

function getMapTypeName(mapType: any): string {
    const cls = mapType?.$class ?? '';
    if (cls.includes('ObjectMap')) {
        return mapType.type?.name ?? 'Object';
    }
    // Extract primitive type: "StringMapKeyType" -> "String"
    const lastDot = cls.lastIndexOf('.');
    const name = cls.substring(lastDot + 1);
    return name.replace('MapKeyType', '').replace('MapValueType', '');
}

export default function MapNode({ data }: { data: MapNodeData }) {
    const declaration = data.declaration;
    const stereotype = getStereotype(declaration.$class);
    return (
        <>
            <Handle type='target' position={Position.Bottom} />
            <Handle type='source' position={Position.Top} />
            <div className='Node'>
                <div className='header' style={{ backgroundColor: colors[declaration.$class] }}>
                    {stereotype && <div className='Stereotype'>{stereotype}</div>}
                    <div className='DeclarationName'>{declaration.name}</div>
                </div>
                <div>
                    <table className='properties'>
                        <tbody>
                            <tr>
                                <td>Key</td>
                                <td className='type'>{getMapTypeName(declaration.key)}</td>
                            </tr>
                            <tr>
                                <td>Value</td>
                                <td className='type'>{getMapTypeName(declaration.value)}</td>
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
