import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IComp } from '../icomp';


@Component({
  selector: 'app-component2',
  templateUrl: './component2.component.html',
  styleUrls: ['./component2.component.css']
})
export class Component2Component implements OnInit, IComp {
  @Output() event = new EventEmitter<string>();
  @Input() text: string;

  constructor() { }

  ngOnInit() {
  }

  onEmit(){
    this.event.emit('Example 2 was clicked');
  }

}
