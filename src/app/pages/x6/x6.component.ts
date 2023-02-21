import { AfterViewInit, Component, ElementRef, Injector, TemplateRef, ViewChild } from '@angular/core';
import { Graph, Node, Shape } from '@antv/x6';
import { random } from 'lodash-es';
import { NodeComponent } from '../../node-component/node.component';
import { register } from '../../x6-angular-shape/src';

@Component({
  selector: 'app-x6',
  templateUrl: './x6.component.html',
  styleUrls: ['./x6.component.scss'],
})
export class X6Component implements AfterViewInit {
  private graph: Graph;
  private idCount = 0;

  @ViewChild('container') container: ElementRef;
  @ViewChild('template') template: TemplateRef<{}>;

  addComponent(): void {
    const config = this.getBaiscNode('custom-angular-component-node');
    this.graph.addNode(config);
  }

  addTemplate(): void {
    const config = this.getBaiscNode('custom-angular-template-node');
    this.graph.addNode(config);
  }

  updateComponentValue(id: string, text: string): void {
    if (!id) {
      alert('请输入需要查找的节点id!');
      return;
    } else if (!text) {
      alert('请输入需要替换的新文本!');
      return;
    }
    const node = this.graph.getCellById(id);
    if (!node) {
      alert('未查询到该节点!');
      return;
    }
    node.setData({
      ngArguments: {
        value: text,
      },
    });
  }

  addBatchComponent(count: number): void {
    const configList = new Array(count).fill(null).map(() => this.getBaiscNode('custom-angular-component-node'));
    this.graph.addNodes(configList);
  }

  addBatchTemplate(count: number): void {
    const configList = new Array(count).fill(null).map(() => this.getBaiscNode('custom-angular-template-node'));
    this.graph.addNodes(configList);
  }

  addBatchHTML(count: number): void {
    const configList = new Array(count).fill(null).map(() => this.getBaiscNode('custom-html'));
    this.graph.addNodes(configList);
  }

  private getBaiscNode(shape: string): Node.Metadata {
    const randomX = random(0, 1000);
    const randomY = random(0, 600);
    const config: Node.Metadata = {
      id: `${++this.idCount}`,
      x: randomX,
      y: randomY,
      shape,
      data: {
        ngArguments: {
          value: `${this.idCount}`,
        },
      },
    };
    return config;
  }

  constructor(private injector: Injector) {}

  ngAfterViewInit(): void {
    this.graph = new Graph({
      container: this.container.nativeElement,
      width: 1000,
      height: 600,
      background: {
        color: '#F2F7FA',
      },
    });
    register({
      shape: 'custom-angular-component-node',
      width: 120,
      height: 20,
      content: NodeComponent,
      injector: this.injector,
    });
    register({
      shape: 'custom-angular-template-node',
      width: 120,
      height: 20,
      content: this.template,
      injector: this.injector,
    });
    Shape.HTML.register({
      shape: 'custom-html',
      width: 120,
      height: 20,
      effect: ['data'],
      html(cell) {
        const { ngArguments } = cell.getData();
        const section = document.createElement('section');
        section.style.display = 'flex';
        section.style.justifyContent = 'center';
        section.style.alignItems = 'center';
        section.style.border = '2px solid #000';
        section.style.width = '100%';
        section.style.height = '100%';
        section.innerHTML = `
          HTML: <span style="color: gray;">${ngArguments.value}</span>
        `;
        return section;
      },
    });
  }
}
