import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Observer} from 'rxjs/Observer';
import {Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  numberObsSubscription: Subscription;
  customObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    const myNumber = Observable.interval(1000)
      .map(
        (data: number) => {
          return data * 2;
        }
      )
      .delay(new Date(Date.now() + 2000));
    this.numberObsSubscription = myNumber.subscribe(
      (number: number) => {
        console.log(number);
        if(number === 20) {
          console.log('done');
          this.numberObsSubscription.unsubscribe();
        }
      },
    );

    const myObservable = Observable.create((observer: Observer<string>) => {
      setTimeout(() => {
        observer.next('first package');
      }, 2000);
      setTimeout(() => {
        observer.next('second package');
      }, 4000);
      setTimeout(() => {
        observer.complete();
      }, 5000);
    });
    this.customObsSubscription = myObservable.subscribe(
      (data: string) => { console.log(data); },
      (error: string) => { console.log(error); },
      () => { console.log('complated'); },
      );
  }

  ngOnDestroy() {
    this.customObsSubscription.unsubscribe();
    this.numberObsSubscription.unsubscribe();
  }

}
