import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'home-budget';
    showSidenav: boolean = true;

    onToggle(): void {
        this.showSidenav = !this.showSidenav;
    }
}
