export const colors: Record<string, string> = {
  'concerto.metamodel@1.0.0.EnumDeclaration': '#e8eaf6',
  'concerto.metamodel@1.0.0.ConceptDeclaration': '#fff8e1',
  'concerto.metamodel@1.0.0.ParticipantDeclaration': '#e8f5e9',
  'concerto.metamodel@1.0.0.TransactionDeclaration': '#eceff1',
  'concerto.metamodel@1.0.0.EventDeclaration': '#fce4ec',
  'concerto.metamodel@1.0.0.AssetDeclaration': '#fff3e0',
  'concerto.metamodel@1.0.0.MapDeclaration': '#f3e5f5',
  'concerto.metamodel@1.0.0.StringScalar': '#e1f5fe',
  'concerto.metamodel@1.0.0.IntegerScalar': '#e1f5fe',
  'concerto.metamodel@1.0.0.DoubleScalar': '#e1f5fe',
  'concerto.metamodel@1.0.0.LongScalar': '#e1f5fe',
  'concerto.metamodel@1.0.0.BooleanScalar': '#e1f5fe',
  'concerto.metamodel@1.0.0.DateTimeScalar': '#e1f5fe',
};

export function getStereotype(declClass: string): string {
  const lastDot = declClass.lastIndexOf('.');
  const name = declClass.substring(lastDot + 1);
  if (name.endsWith('Scalar')) return '\u00ABscalar\u00BB';
  if (name === 'MapDeclaration') return '\u00ABmap\u00BB';
  if (name === 'EnumDeclaration') return '\u00ABenum\u00BB';
  if (name === 'ConceptDeclaration') return '\u00ABconcept\u00BB';
  if (name === 'AssetDeclaration') return '\u00ABasset\u00BB';
  if (name === 'ParticipantDeclaration') return '\u00ABparticipant\u00BB';
  if (name === 'TransactionDeclaration') return '\u00ABtransaction\u00BB';
  if (name === 'EventDeclaration') return '\u00ABevent\u00BB';
  return '';
}
