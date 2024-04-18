import { AfterViewInit, ChangeDetectorRef, Component, Injector, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss'],
})
export class NodeComponent implements AfterViewInit, OnChanges {
  @Input() value: string;

  transition = false;
  injectValue: Subject<any>;

  constructor(private cdr: ChangeDetectorRef, private injector: Injector) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.transition = true;
      this.cdr.detectChanges();
    }, 100);

    this.injectValue = this.injector.get('#TOKEN')
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);
  }
}
