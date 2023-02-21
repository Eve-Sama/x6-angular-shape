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
  private idCount = 0;

  @ViewChild('container') container: ElementRef;

  addNode(): void {
    const config = this.getBaiscNode();
    (this.data.nodes as NodeConfig[]).push(config)
    this.render();
  }

  addBatchComponent(count: number): void {
    const configList = new Array(count).fill(null).map(() => this.getBaiscNode());
    (this.data.nodes as NodeConfig[]).push(...configList)
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
      (cfg) => `
        <group>
          <rect>
            <rect style={{
              width: 150,
              height: 20,
              fill: ${cfg.color},
              radius: [6, 6, 0, 0],
              cursor: 'move'，
              stroke: ${cfg.color}
            }} draggable="true">
              <text style={{
                marginTop: 2,
                marginLeft: 75,
                textAlign: 'center',
                fontWeight: 'bold',
                fill: '#fff' }}>{{label}}</text>
            </rect>
            <rect style={{
              width: 150,
              height: 55,
              stroke: ${cfg.color},
              fill: #ffffff,
              radius: [0, 0, 6, 6],
            }}>
              <text style={{ marginTop: 5, marginLeft: 3, fill: '#333', marginLeft: 4 }}>描述: {{description}}</text>
              <text style={{ marginTop: 10, marginLeft: 3, fill: '#333', marginLeft: 4 }}>创建者: {{meta.creatorName}}</text>
            </rect>
          </rect>
          <circle style={{
            stroke: ${cfg.color},
            r: 10,
            fill: '#fff',
            marginLeft: 75,
            cursor: 'pointer'
          }} name="circle">
            <image style={{ img: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png', width: 12, height: 12,  marginLeft: 70,  marginTop: -5 }} />
          </circle>
        </group>`,
    );
  }
}
