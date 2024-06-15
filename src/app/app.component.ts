import { AfterViewInit, Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  title = 'testapp';
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateScreenSize(Math.min(window.screen.width, window.screen.height));
  }
  screenSize = Math.min(window.screen.width, window.screen.height);

  ngAfterViewInit(): void {
    this.updateScreenSize(Math.min(window.screen.width, window.screen.height));
  }

  updateScreenSize(screen: number) {
    console.log(screen);
    this.screenSize = screen;
  }

  get isMobile() {
    console.log(
      'checkoo',
      window.screen.width,
      Math.min(window.screen.width, window.screen.height)
    );
    return this.screenSize < 600;
  }
}
