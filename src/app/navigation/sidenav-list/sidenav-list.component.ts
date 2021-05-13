import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() sideNavToggle = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onToggle() {
    this.sideNavToggle.emit()
  }
}
