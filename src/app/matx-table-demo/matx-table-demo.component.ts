import { Component, OnInit } from '@angular/core';
import { Player, players } from './players_mock';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { map } from 'rxjs/operators';
import { MatxColumnDirective } from 'angular-material-extended';

export interface Post {
  id: number;
  user: User;
  title: string;
  body: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {lat: number, lng: number};
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string
  };
}

@Component({
  selector: 'app-matx-table-demo',
  templateUrl: './matx-table-demo.component.html',
  styleUrls: ['./matx-table-demo.component.scss']
})
export class MatxTableDemoComponent {

  players: Player[] = players;

  selectable = true;

  editable = true;

  nameFrozenLeft = true;

  nationalFrozenRight = true;

  nameWidth = '200px';

  nationalWidth = '200px';

  posts$ = new ReplaySubject<Post[]>(1);

  page = {
    total: 0,
    size: 10,
    number: 1
  };

  sort: string;
  order: string;

  sortByClub = r1 => r1.item.club;

  constructor(private http: HttpClient) {
    this.getPosts();
  }

  private getPosts() {
    const params: any = {
      _page: this.page.number.toString(),
      _limit: this.page.size.toString()
    };
    if (this.sort) { params._sort = this.sort; }
    if (this.order) { params._order = this.order; }
    return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts?_expand=user', {
      observe: 'response',
      params
    })
      .subscribe(resp => {
        this.page.total = Number(resp.headers.get('x-total-count'));
        this.posts$.next(resp.body);
      });
  }

  requestPage(page: PageEvent) {
    this.page.number = page.pageIndex + 1;
    this.page.size = page.pageSize;
    this.getPosts();
  }

  remoteSortBy(sortedColumns: MatxColumnDirective[]) {
    this.sort = sortedColumns.map(c => c.sortDirection !== 0 && (c.field || c.sortBy as string)).join(',');
    this.order = sortedColumns.map(c => c.sortDirection > 0 ? 'asc' : c.sortDirection < 0 ? 'desc' : '').join(',');
    this.getPosts();
  }
}
