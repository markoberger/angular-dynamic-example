import { Component, OnInit, Input, ComponentFactoryResolver, ViewChild, OnChanges, ChangeDetectionStrategy, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Component1Component } from '../component1/component1.component';
import { PlaceholderDirective } from '../placeholder.directive';
import { Component2Component } from '../component2/component2.component';
import { IComp } from '../icomp';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicComponent implements OnInit, OnChanges{
  @ViewChild(PlaceholderDirective, {static: true}) placeholder: PlaceholderDirective;
  @Input() inputData: number; 
  @Output() changeEmit: EventEmitter<string> = new EventEmitter<string>(); 
  components = [Component1Component, Component2Component];

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit() {
    console.log('onInit', this.inputData);
    
    // this.loadComponent();
  }
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log('sC', changes);
    
    if(changes.inputData.currentValue != undefined){
      this.loadComponent();
    }
  }

  
  loadComponent(){
    console.log('call');
    
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.components[this.inputData]);
    const viewContainerRef = this.placeholder.viewContainerRef;

    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    (componentRef.instance as IComp).text = ''+this.inputData;
    (componentRef.instance as IComp).event.subscribe(
      data => this.changeEmit.emit(data)
    );
  }
}
