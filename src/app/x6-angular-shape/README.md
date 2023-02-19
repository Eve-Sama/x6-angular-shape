# @antv/x6-angular-shape

## 渲染节点

我们提供了一个独立的包 `@antv/x6-angular-shape` 以支持将 Angular 的组件/模板作为节点进行渲染。

### Component 渲染

首先需要准备一个自定义的 Component
```ts
@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss'],
})
export class NodeComponent implements AfterViewInit, OnChanges {
  @Input() value: string;
}
```

```ts
import { register } from "@antv/x6-angular-shape";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    register({
      shape: 'custom-angular-component-node',
      width: 120,
      height: 20,
      content: NodeComponent,
      injector: this.injector,
    });

    this.graph.addNode({
      shape: 'custom-angular-template-node',
      x: randomX,
      y: randomY,
      data: {
        // 所有
        ngInput: {
          value: `${this.idCount}`,
        },
      },
    });
  }
}

```
