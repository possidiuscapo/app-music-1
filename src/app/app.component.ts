import { Component, Input, OnInit } from '@angular/core';
import { Observable, interval, map, take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app-music';
  receivedText: string | undefined;
  timer!: Observable<string>;
  count!: string;

  ngOnInit(): void {
    this.timer = interval(1000).pipe(
      take(12 * 3600),

      map(num => {
        const hours = Math.floor(num / 3600);
        const minutes = Math.floor(num / 60);
        return `${this.format(hours)} h ${this.format(minutes - hours * 60)} min ${this.format(num - minutes * 60)} s`;
      })
    );
    this.timer.subscribe({
      next: (num) => {
        this.count = num;
      }
    });
  }
  parentReceive($event: string) {
    this.receivedText = $event;
  }

  format(num: number): string {
    return (num < 10 ? '0' : '') + num;
  }
}
