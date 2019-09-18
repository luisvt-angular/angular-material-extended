import { Component, OnInit } from '@angular/core';
import { players } from './players_mock';

@Component({
  selector: 'app-matx-table-demo',
  templateUrl: './matx-table-demo.component.html',
  styleUrls: ['./matx-table-demo.component.scss']
})
export class MatxTableDemoComponent implements OnInit {

  players = players;

  selectable = true;

  editable = true;

  nameFrozenLeft = true;

  nationalFrozenRight = true;

  nameWidth = '200px';

  nationalWidth = '200px';

  constructor() { }

  ngOnInit() {
  }

}
