import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Graph } from '@antv/x6';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('container') container: ElementRef;

  ngAfterViewInit(): void {
    new Graph({
      container: this.container.nativeElement,
      width: 800,
      height: 600,
      background: {
        color: '#F2F7FA',
      },
    });
  }
}
