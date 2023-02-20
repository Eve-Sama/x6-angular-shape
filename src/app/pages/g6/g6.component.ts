import { AfterViewInit, Component, ElementRef, Injector, ViewChild } from '@angular/core';
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
    const randomX = random(0, 1000);
    const randomY = random(0, 600);
    (this.data.nodes as NodeConfig[]).push({
      id: `${++this.idCount}`,
      x: randomX,
      y: randomY,
      label: `${this.idCount}`,
    })
    this.graph.data(this.data);
    this.graph.render();
  }

  constructor(private injector: Injector) {}

  ngAfterViewInit(): void {
    this.graph = new G6.Graph({
      container: this.container.nativeElement,
      width: 1000,
      height: 600,
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
    console.log(this.injector);
  }
}
