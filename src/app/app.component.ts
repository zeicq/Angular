import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TabService } from './services/tab.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isResetRoute: boolean = false;


  constructor(private router: Router, private activatedRoute: ActivatedRoute, private tabService: TabService) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.isResetRoute = this.activatedRoute.snapshot.firstChild?.routeConfig?.path === 'reset';
    });
  }


  get selectedIndex(): number {
    return this.tabService.getSelectedIndex();
  }

}