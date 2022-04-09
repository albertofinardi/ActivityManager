import { Component, OnInit } from '@angular/core';
import { requestNotification } from 'src/app/utility/notification';

@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.css']
})
export class InterfaceComponent implements OnInit {

  public isCollapsed = false;
  
  constructor() { 
    requestNotification()
  }

  ngOnInit(): void {
  }

}
