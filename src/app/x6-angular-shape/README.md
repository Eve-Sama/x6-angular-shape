# @antv/x6-angular-shape

## 渲染节点

我们提供了一个独立的包 `@antv/x6-angular-shape` 以支持将 Angular 的组件/模板作为节点进行渲染。

### Component 渲染

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
      shape: 'custom-angular-component-node',
      x: 100,
      y: 100,
      data: {
        // Input 的参数必须放在这里
        ngInput: {
          value: '糟糕糟糕 Oh my god',
        },
      },
    });
  }
}

```

### TemplateRef 渲染

```html
<ng-template #template let-data="ngInput">
  <section class="template-container">
    <span class="value">{{ data.value }}</span>
  </section>
</ng-template>
```

```ts
import { register } from "@antv/x6-angular-shape";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('template') template: TemplateRef<{}>;

  ngAfterViewInit(): void {
    register({
      shape: 'custom-angular-template-node',
      width: 120,
      height: 20,
      content: this.template,
      injector: this.injector,
    });

    this.graph.addNode({
      shape: 'custom-angular-template-node',
      x: 100,
      y: 100,
      data: {
        ngInput: {
          value: '魔法怎么失灵啦',
        },
      },
    });
  }
}

```
