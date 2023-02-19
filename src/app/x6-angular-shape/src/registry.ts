import { Injector, TemplateRef, Type } from '@angular/core';
import { Graph, Node } from '@antv/x6';

type Content = TemplateRef<any> | Type<any>;

export type AngularShapeConfig = Node.Properties & {
  shape: string;
  injector: Injector;
  content: Content;
};

export const shapeMaps: Record<
  string,
  {
    injector: Injector;
    content: Content;
  }
> = {};

export function register(config: AngularShapeConfig) {
  const { shape, injector, content, ...others } = config;
  if (!shape) {
    throw new Error('should specify shape in config');
  }
  shapeMaps[shape] = {
    injector,
    content,
  };

  Graph.registerNode(
    shape,
    {
      injector,
      content,
      ...others,
    },
    true,
  );
}
