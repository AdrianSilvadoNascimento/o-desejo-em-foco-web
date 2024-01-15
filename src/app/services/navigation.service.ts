import { Injectable } from '@angular/core';
import { NavigationEnd, Router, RouterStateSnapshot, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private previousUrl: string = '/'
  
  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event: any) => event instanceof RoutesRecognized), pairwise())
      .subscribe((events: RoutesRecognized[]) => {
        this.previousUrl = events[0].urlAfterRedirects
      })
  }

  getPreviousRoute(): string {
    return this.previousUrl
  }
}
