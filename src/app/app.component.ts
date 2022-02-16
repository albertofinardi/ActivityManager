import { Component, OnInit } from '@angular/core';
import { availableMonitors } from '@tauri-apps/api/window';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    //this.init()
  }
  title = 'activity_manager_tauri';
/*
  async init(){
    let monitors = await availableMonitors();
    console.log(monitors)
  }*/

}
