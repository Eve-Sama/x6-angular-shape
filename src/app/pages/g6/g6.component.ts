import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import G6, { Graph, GraphData, NodeConfig, TreeGraphData } from '@antv/g6';
import { random } from 'lodash-es';

@Component({
  selector: 'app-g6',
  templateUrl: './g6.component.html',
  styleUrls: ['./g6.component.scss'],
})
export class G6Component implements AfterViewInit {
  private graph: Graph;
  private data: GraphData | TreeGraphData = {
    nodes: [],
  };

  idCount = 0;

  @ViewChild('container') container: ElementRef;

  addNode(): void {
    const config = this.getBaiscNode();
    (this.data.nodes as NodeConfig[]).push(config);
    this.render();
  }

  addBatch(count: number): void {
    const configList = new Array(count).fill(null).map(() => this.getBaiscNode());
    (this.data.nodes as NodeConfig[]).push(...configList);
    this.render();
  }

  removeBatch(count: number): void {
    const nodes = this.data.nodes as NodeConfig[];
    if (nodes.length === 0) {
      return;
    }
    new Array(count).fill(null).forEach(() => (this.data.nodes as NodeConfig[]).pop());
    this.idCount -= count;
    if (this.idCount < 0) {
      this.idCount = 0;
    }
    this.render();
  }

  /** 设置 G6 的数据并且渲染 */
  private render(): void {
    this.graph.data(this.data);
    this.graph.render();
  }

  private getBaiscNode(): NodeConfig {
    const randomX = random(0, 1000);
    const randomY = random(0, 600);
    const config: NodeConfig = {
      id: `${++this.idCount}`,
      label: `${this.idCount}`,
      x: randomX,
      y: randomY,
      description: 'ant_type_name_...',
      color: '#2196f3',
      meta: {
        creatorName: 'a_creator',
      },
      type: 'rect-jsx',
    };
    return config;
  }

  ngAfterViewInit(): void {
    this.graph = new G6.Graph({
      container: this.container.nativeElement,
      width: 1000,
      height: 600,
      renderer: 'svg',
      modes: {
        default: ['drag-canvas', 'drag-node'],
      },
      defaultNode: {
        type: 'circle',
        size: [60],
        labelCfg: {
          position: 'bottom',
        },
      },
    });
    G6.registerNode(
      'rect-jsx',
      cfg => `
        <group>
          <rect>
            <rect style={{
              width: 120,
              height: 20,
              fill: ${cfg.color},
              radius: [6, 6, 0, 0],
              cursor: 'move'，
              stroke: ${cfg.color}
            }} draggable="true">
              <text style={{
                marginTop: 2,
                marginLeft: 58,
                textAlign: 'center',
                fontWeight: 'bold',
                fill: '#fff' }}>{{label}}</text>
            </rect>
            <rect style={{
              width: 120,
              height: 20,
              stroke: ${cfg.color},
              fill: #ffffff,
              radius: [0, 0, 6, 6],
            }}>
              <text style={{ marginTop: 5, fill: '#333', marginLeft: 38 }}>性能测试</text>
            </rect>
          </rect>
        </group>`,
    );
  }
}
