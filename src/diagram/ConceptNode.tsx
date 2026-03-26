import { Handle, Position } from '@xyflow/react';
import { colors, getStereotype } from '../theme';
import { ConceptNodeData } from '../types';
import { getModifiers, getNameOfType } from '../modelUtil';
import useStore from '../store';

import './Node.css';
import { MAX_PROPERTIES } from '../diagramUtil';

export default function ConceptNode({ data }: { data: ConceptNodeData }) {
    const declaration = data.declaration;
    const stereotype = getStereotype(declaration.$class);
    const isAbstract = declaration.isAbstract;
    const addPropertyToConcept = useStore((state) => state.addPropertyToConcept);

    const handleAddProperty = (e: React.MouseEvent) => {
        e.stopPropagation();
        const ns = data.type.namespace;
        if (ns) {
            addPropertyToConcept(ns, declaration.name);
        }
    };

    return (
        <>
            <Handle type='target' position={Position.Bottom} />
            <Handle type='source' position={Position.Top} />
            <div className={`Node${isAbstract ? ' Node--abstract' : ''}`}>
                <div className='header' style={{ backgroundColor: colors[declaration.$class] }}>
                    {stereotype && <div className='Stereotype'>{stereotype}</div>}
                    <div className='DeclarationName'>{declaration.name}</div>
                </div>
                <div>
                    <table className='properties'>
                        <tbody>
                            {declaration.properties.slice(0,MAX_PROPERTIES).map(prop => (
                                <tr key={prop.name}>
                                    <td>{prop.name}</td>
                                    <td></td>
                                    <td className='type'>
                                        {getNameOfType(prop)}
                                    </td>
                                    <td className='modifiers'>
                                        {getModifiers(prop)}
                                    </td>
                                </tr>
                            ))}
                            {declaration.properties.length > MAX_PROPERTIES ? <tr><td>...</td></tr> : null }
                        </tbody>
                    </table>
                </div>
                <div className='footer'>
                    <button
                        className='add-property-btn'
                        onClick={handleAddProperty}
                        title='Add property'
                    >
                        + Add Property
                    </button>
                </div>
            </div>
        </>
    );
}
