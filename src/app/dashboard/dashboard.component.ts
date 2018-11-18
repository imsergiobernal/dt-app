import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { FeedsService } from  './feeds.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  private feeds: Array<object> = [];

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches && this.feeds) {
        return this.feeds.map((feed) => {
          feed.cols = 4;
          feed.rows = 1;
          return feed;
        });
      };
      return this.feeds.map((feed) => {
        feed.cols = 1;
        feed.rows = 1;
        return feed;
      });
    });
  );

  constructor(private breakpointObserver: BreakpointObserver, private feedService: FeedsService) {}

  ngOnInit() {
    this.getFeeds();
  }

  public getFeeds(){
    this.feedService.getFeeds().subscribe((data: Array<object>) => {
      data = data.map((feed) => {
        feed.body = feed.body.slice(0, 200);
        feed.body += '...';
        feed.cols = 1;
        feed.rows = 1;
        return feed;
      });
      this.feeds = data;
    });
  }

}
