import { AfterViewInit, Component, ElementRef, Injector, TemplateRef, ViewChild } from '@angular/core';
import { Graph, Node } from '@antv/x6';
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
    const config = this.getBaiscNode();
    this.graph.addNode({
      ...config,
      shape: 'custom-angular-component-node',
    });
  }

  addTemplate(): void {
    const randomX = random(0, 1000);
    const randomY = random(0, 600);
    this.graph.addNode({
      id: `${++this.idCount}`,
      shape: 'custom-angular-template-node',
      x: randomX,
      y: randomY,
      data: {
        ngArguments: {
          value: `${this.idCount}`,
        },
      },
    });
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
    const configList = new Array(count).fill(null).map(() => this.getBaiscNode());
    this.graph.addNodes(configList);
  }

  private getBaiscNode(): Node.Metadata {
    const randomX = random(0, 1000);
    const randomY = random(0, 600);
    const config: Node.Metadata = {
      id: `${++this.idCount}`,
      shape: 'custom-angular-component-node',
      x: randomX,
      y: randomY,
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
  }
}
