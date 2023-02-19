import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-node',
  template: `111<div>{{ title }}</div>`
})
export class NodeComponent {
  @Input() title: string;
}
