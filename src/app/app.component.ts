import { AfterViewInit, Component, ElementRef, Injector, ViewChild } from '@angular/core';
import { Graph, Shape } from '@antv/x6';
import { NodeComponent } from './node-component/node.component';
import { register } from './x6-angular-shape/src';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  private graph: Graph;

  @ViewChild('container') container: ElementRef;

  addComponent(): void {
    this.graph.addNode({
      shape: 'custom-angular-node',
      x: 60,
      y: 100,
      data: {
        ngInput: {
          title: '前夕',
        },
      },
    });
    // this.graph.addNode({
    //   shape: 'custom-html',
    //   x: 60,
    //   y: 100,
    // });
    console.log(this.graph.getNodes());
  }

  doRegister(): void {
    register({
      shape: 'custom-angular-node',
      width: 160,
      height: 80,
      content: NodeComponent,
      injector: this.injector,
    });
  }

  constructor(private injector: Injector) {}

  ngAfterViewInit(): void {
    this.graph = new Graph({
      container: this.container.nativeElement,
      width: 800,
      height: 600,
      background: {
        color: '#F2F7FA',
      },
    });
    // Shape.HTML.register({
    //   shape: 'custom-html',
    //   width: 160,
    //   height: 80,
    //   html() {
    //     const div = document.createElement('div');
    //     div.innerHTML = 'hello';
    //     div.className = 'custom-html';
    //     return div;
    //   },
    // });
  }
}
