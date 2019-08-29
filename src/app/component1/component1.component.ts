import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IComp } from '../icomp';

@Component({
  selector: 'app-component1',
  templateUrl: './component1.component.html',
  styleUrls: ['./component1.component.css']
})
export class Component1Component implements OnInit, IComp {
  @Output() event = new EventEmitter<string>();
  @Input() text: string;

  constructor() { }

  ngOnInit() {
  }

  onEmit(){
    this.event.emit('Component 1 was clicked');
  }
}
