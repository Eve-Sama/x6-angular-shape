import { AfterViewInit, Component, ElementRef, Injector, TemplateRef, ViewChild } from '@angular/core';
import { Cell, Graph, Node, Shape } from '@antv/x6';
import { random } from 'lodash-es';
import { NodeComponent } from '../../node-component/node.component';
import { register } from '../../x6-angular-shape/src';
import { shapeNameMap, ShapeNmae, ShapeType } from './type';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-x6',
  templateUrl: './x6.component.html',
  styleUrls: ['./x6.component.scss'],
  providers: [
    {
      provide: '#TOKEN',
      useValue: new BehaviorSubject('Default'),
    },
  ],
})
export class X6Component implements AfterViewInit {
  private graph: Graph;
  private idCount = 0;

  nodeCountMap = new Map<ShapeType, number>([
    ['component', 0],
    ['template', 0],
    ['html', 0],
  ]);

  @ViewChild('container') container: ElementRef;
  @ViewChild('template') template: TemplateRef<{}>;

  addNode(shapeType: ShapeType): void {
    const config = this.getBaiscNode(shapeNameMap.get(shapeType)!);
    this.graph.addNode(config);
    this.addNodeCount(shapeType);
  }

  addBatchNode(count: number, shapeType: ShapeType): void {
    const configList = new Array(count).fill(null).map(() => this.getBaiscNode(shapeNameMap.get(shapeType)!));
    this.graph.addNodes(configList);
    this.addNodeCount(shapeType, configList.length);
  }

  removeBatchNode(count: number, shapeType: ShapeType): void {
    const cellList = this.graph.getCells();
    const lastCountCellList: Cell<Cell.Properties>[] = [];
    for (let index = 0; index < cellList.length; index++) {
      const cell = cellList[index];
      if (cell.shape === shapeNameMap.get(shapeType)) {
        lastCountCellList.push(cell);
      }
      if (lastCountCellList.length === count) {
        break;
      }
    }
    this.graph.removeCells(lastCountCellList);
    this.idCount -= lastCountCellList.length;
    this.addNodeCount(shapeType, -lastCountCellList.length);
  }

  updateNodeValue(id: string, text: string): void {
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

  updateInjectValue(value: string) {
    const injector = this.injector.get('#TOKEN');
    injector.next(value);
  }

  private getBaiscNode(shape: ShapeNmae): Node.Metadata {
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

  private addNodeCount(shapeType: ShapeType, count: number = 1): void {
    const tempCount = this.nodeCountMap.get(shapeType)!;
    this.nodeCountMap.set(shapeType, tempCount + count);
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
      shape: shapeNameMap.get('component')!,
      width: 120,
      height: 20,
      content: NodeComponent,
      injector: this.injector,
    });
    register({
      shape: shapeNameMap.get('template')!,
      width: 120,
      height: 20,
      content: this.template,
      injector: this.injector,
    });
    Shape.HTML.register({
      shape: shapeNameMap.get('html')!,
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
