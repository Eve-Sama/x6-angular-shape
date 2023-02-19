import { EmbeddedViewRef, TemplateRef, ViewContainerRef } from '@angular/core';
import { Dom, NodeView } from '@antv/x6';
import { AngularShape } from './node';
import { registerInfo } from './registry';

export class AngularShapeView extends NodeView<AngularShape> {
  getNodeContainer(): HTMLDivElement {
    return this.selectors?.foContent as HTMLDivElement;
  }

  override confirmUpdate(flag: number): number {
    const ret = super.confirmUpdate(flag);
    return this.handleAction(ret, AngularShapeView.action, () => this.renderAngularContent());
  }

  private getNgInput(): Record<string, any> {
    const input = (this.cell.data?.ngInput as Record<string, any>) || {};
    return input;
  }

  protected renderAngularContent(): void {
    this.unmountAngularContent();
    const container = this.getNodeContainer();
    if (container) {
      const node = this.cell;
      const { injector, content } = registerInfo.get(node.shape)!;
      const viewContainerRef = injector.get(ViewContainerRef);
      if (content instanceof TemplateRef) {
        const ngInput = this.getNgInput();
        const embeddedViewRef = viewContainerRef.createEmbeddedView(content, { ngInput });
        embeddedViewRef.rootNodes.forEach(node => container.appendChild(node));
        embeddedViewRef.detectChanges();
        // Todo: Template的值如何更新?
      } else {
        const componentRef = viewContainerRef.createComponent(content);
        const insertNode = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        container.appendChild(insertNode);
        // 将用户传入的 ngInput 依次赋值到 component 的属性当中
        const renderComponentInstance = () => {
          const ngInput = this.getNgInput();
          Object.keys(ngInput).forEach(v => (componentRef.setInput(v, ngInput[v])));
          componentRef.changeDetectorRef.detectChanges();
        };
        renderComponentInstance();
        node.on('change:data', () => renderComponentInstance());
      }
    }
  }

  protected unmountAngularContent(): HTMLDivElement {
    const container = this.getNodeContainer();
    container.innerHTML = '';
    return container;
  }

  override onMouseDown(e: Dom.MouseDownEvent, x: number, y: number) {
    const target = e.target as Element;
    const tagName = target.tagName.toLowerCase();
    if (tagName === 'input') {
      const type = target.getAttribute('type');
      if (type == null || ['text', 'password', 'number', 'email', 'search', 'tel', 'url'].includes(type)) {
        return;
      }
    }

    super.onMouseDown(e, x, y);
  }

  override unmount(): this {
    this.unmountAngularContent();
    super.unmount();
    return this;
  }
}

export namespace AngularShapeView {
  export const action = 'angular' as any;

  AngularShapeView.config({
    bootstrap: [action],
    actions: {
      component: action,
    },
  });

  NodeView.registry.register('angular-shape-view', AngularShapeView, true);
}
