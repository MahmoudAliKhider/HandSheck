import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchCategory = '';

  constructor(activateRoute: ActivatedRoute, private route: Router) {
    activateRoute.queryParams.subscribe((params) => {
      if (params['keyword']) this.searchCategory = params['keyword'];
    });
  }

  ngOnInit(): void {}

  search(keywords: string): void {
    if (keywords) {
      this.route.navigate(['shop/search'], {
        queryParams: { keyword: keywords },
      });
    }
  }
}
