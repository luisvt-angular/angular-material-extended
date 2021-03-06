import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { MatxNavTreeItem } from './matx-nav-tree-item';
import { ActivatedRoute, Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'matx-nav-tree',
  templateUrl: './matx-nav-tree.component.html',
  styleUrls: ['./matx-nav-tree.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('expanded', style({transform: 'rotate(180deg)'})),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class MatxNavTreeComponent implements OnInit {
  @HostBinding('attr.aria-expanded') expanded: boolean[];
  @Input() items: MatxNavTreeItem[];
  @Input() depth = 0;

  constructor(public router: Router) { }

  ngOnInit() {
    this.expanded = new Array(this.items.length);
  }

  onItemSelected(item: MatxNavTreeItem, index: number) {
    if (item.children && item.children.length) {
      this.expanded[index] = !this.expanded[index];
    } else {
      this.router.navigate([item.route]);
      // this.navService.closeNav();
    }
  }
}
