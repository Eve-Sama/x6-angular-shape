import { AfterViewInit, Component, ElementRef, Injector, TemplateRef, ViewChild } from '@angular/core';
import { Graph, Shape } from '@antv/x6';
import { random } from 'lodash-es';
import { NodeComponent } from './node-component/node.component';
import { register } from './x6-angular-shape/src';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  private hasRegisterComponent = false;
  private hasRegisterTemplate = false;
  private graph: Graph;
  private idCount = 0;

  @ViewChild('container') container: ElementRef;
  @ViewChild('template') template: TemplateRef<{}>;

  addComponent(): void {
    if (!this.hasRegisterComponent) {
      alert('请先注册 Angular Component!');
      return;
    }
    const randomX = random(0, 1000);
    const randomY = random(0, 600);
    this.graph.addNode({
      id: `${++this.idCount}`,
      shape: 'custom-angular-component-node',
      x: randomX,
      y: randomY,
      data: {
        ngInput: {
          value: `${this.idCount}`,
        },
      },
    });
  }

  addTemplate(): void {
    if (!this.hasRegisterTemplate) {
      alert('请先注册 Angular Template!');
      return;
    }
    const randomX = random(0, 1000);
    const randomY = random(0, 600);
    this.graph.addNode({
      id: `${++this.idCount}`,
      shape: 'custom-angular-template-node',
      x: randomX,
      y: randomY,
      data: {
        ngInput: {
          value: `${this.idCount}`,
        },
      },
    });
  }

  doRegisterComponent(): void {
    if (this.hasRegisterComponent) {
      alert('请勿重复注册 Angular Component!');
      return;
    }
    register({
      shape: 'custom-angular-component-node',
      width: 120,
      height: 20,
      content: NodeComponent,
      injector: this.injector,
    });
    this.hasRegisterComponent = true;
  }

  doRegisterTemplate(): void {
    if (this.hasRegisterTemplate) {
      alert('请勿重复注册!');
      return;
    }
    register({
      shape: 'custom-angular-template-node',
      width: 120,
      height: 20,
      content: this.template,
      injector: this.injector,
    });
    this.hasRegisterTemplate = true;
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
      ngInput: {
        value: text,
      },
    });
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
  }
}
