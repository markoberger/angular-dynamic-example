import { Component, OnInit, Input, ComponentFactoryResolver, ViewChild, OnChanges, ChangeDetectionStrategy, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Component1Component } from '../component1/component1.component';
import { PlaceholderDirective } from '../placeholder.directive';
import { Component2Component } from '../component2/component2.component';
import { IComp } from '../icomp';


@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicComponent implements OnInit, OnChanges{
  /**Here we grab reference placeholder directive  */
  @ViewChild(PlaceholderDirective, {static: true}) placeholder: PlaceholderDirective;
  @Input() inputData: number;
  @Output() changeEmit: EventEmitter<string> = new EventEmitter<string>();
  /**An array where we register what component we want to load */
  components = [Component1Component, Component2Component];

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    /**
     * We are using this hook for change detection and invoking loadComponent() method
     * There are more ways to do this but for the simplicity of this example I have decided on this way
     */
    if(changes.inputData.currentValue != undefined){ // We need to check if inputData has some value
      this.loadComponent();
    }
  }

  /**
   * A method that loads and creates instances of components
   */
  loadComponent(){
    /** Preparing our component for creation */
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.components[this.inputData]);
    /** Grabbing reference of our view placeholder */
    const viewContainerRef = this.placeholder.viewContainerRef;
    /** Clearing our placeholder  */
    viewContainerRef.clear();
    /** Magic of creating a component instance  */
    const componentRef = viewContainerRef.createComponent(componentFactory);
    /** 
     * @Input data into our instance.
     */
    (componentRef.instance as IComp).text = ''+this.inputData;
    /** @Output data from our instance  */
    (componentRef.instance as IComp).event.subscribe(
      data => this.changeEmit.emit(data)
    );
  }
}
