export type ShapeType = 'component' | 'template' | 'html';
export type ShapeNmae = `custom-${ShapeType}-node`;

export const shapeNameMap = new Map<ShapeType, ShapeNmae>([
  ['component', 'custom-component-node'],
  ['template', 'custom-template-node'],
  ['html', 'custom-html-node'],
]);
