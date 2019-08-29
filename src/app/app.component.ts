import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dynamic-example';
  data: number;
  dynamicOutput: string;
  onAddData(num: number){
    console.log(num);
    
    this.data = num;
  }

  changeColor(event){
    console.log(event);
    
    this.dynamicOutput = event; 
  }
}
