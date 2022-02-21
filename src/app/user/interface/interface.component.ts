import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.css']
})
export class InterfaceComponent implements OnInit {

  public isCollapsed = false;
  
  constructor() { 
  }

  ngOnInit(): void {
  }

}
