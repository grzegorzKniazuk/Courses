import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, forkJoin, interval, race, range, timer, zip } from 'rxjs';
import { concatMap, debounce, debounceTime, map, mapTo, multicast, publish, retry, retryWhen, share, tap, toArray, windowCount, withLatestFrom } from 'rxjs/operators';

@Component({
    selector: 'app-advanced-operators',
    templateUrl: './advanced-operators.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvancedOperatorsComponent implements OnInit {

    private readonly numbers$ = range(1, 10);
    private readonly numbers2$ = range(11, 20);

    private readonly slow$ = interval(2000);
    private readonly fast$ = interval(750);

    private readonly friendAPI = timer(1000).pipe(mapTo({ name: 'Hank' }));
    private readonly preferencesAPI = timer(1700).pipe(mapTo({ name: 'Dark' }));

    ngOnInit() {
        this.advancedOperators();
    }

    private advancedOperators(): void {
        // zip
        // bundles the latest emissions of a number of observables into a single observable
        // indexes of bundled emissions must match
        // zipped observable will emit at the pace of the slowest ancestor
        zip(this.slow$, this.fast$).subscribe(v => console.log(v)); // [0, 0], [1, 1], [2, 2], [3, 3] ...

        // combineLatest
        // one each of the provided observables has emitted at least once, emit a bundle containing all the latest values
        // after that emit an updated bundle whenever any provided observable emits
        // works like zip, except indexes do not have to match
        combineLatest(this.slow$, this.fast$).subscribe(v => console.log(v)); // [0, 1] ... first emit after 2000ms

        // forkJoin
        // runs a number of observables, waits until they all finish, then bundle the results and emit
        // forking - the process of running all the observables at once
        // joining - the process of combining the results
        // if any error, forJoin will error
        // useful for when you need the resulf of all of a number of sequential api call, or none at all
        // resolvers a very common web development use case
        forkJoin(this.friendAPI, this.preferencesAPI).subscribe(v => console.log(v)); // [ { name: 'Hank' }, { name: 'Dark' }]

        // publish
        // returns an observable with a special method - connect
        // works similar to a subject
        // unlike normal observable, published observable does not start executing code as soon as it is subscribed to
        // multiple subscribers can subscribe and all get identical data
        // to start functioning of the observable, like a normal observable responding to subscribe, call connect
        const currencyTicker = interval(1000).pipe(
            tap(() => console.log('API call')),
            map(v => `Currency info #${v} [placeholder]`),
            publish()
        );

        currencyTicker.subscribe(v => console.log('Left widget', v));
        currencyTicker.subscribe(v => console.log('Right widget', v));

        currencyTicker.connect();

        // share
        // like publish, but connect is omitted
        // observable starts executing code as soon as it is subscribed to, but does not start a new thread upon the 2nd, 3nd subscription and so on
        // useful for a long-lived process that gradually returns values
        // like a notifications service with many widgets subscribed to it
        const currencyTicker = interval(1000).pipe(
            tap(() => console.log('API call')),
            map(v => `Currency info #${v} [placeholder]`),
            share()
        );

        currencyTicker.subscribe(v => console.log('Left widget', v));
        currencyTicker.subscribe(v => console.log('Right widget', v));

        // multicast
        // like publish, but returns a subjec instead of an observable with a special property
        // behaviorSubject, ReplaySubject and others can all be used
        const shared = new BehaviorSubject(-1);

        const currencyTicker = interval(1000).pipe(
            tap(() => console.log('API call')),
            map(v => `Currency info #${v} [placeholder]`),
            multicast(shared)
        );

        currencyTicker.subscribe(v => console.log('Left widget', v));
        currencyTicker.subscribe(v => console.log('Right widget', v));

        currencyTicker.connect();

        // race
        // waits until one observable from a group of provided observables emits, discard everything else
        // subsequent emissions from the "winner" will be emitted, while the "losers" of the race will be ignored
        race(this.slow$, this.fast$).subscribe(v => console.log(v)); // emits from fast

        // retry
        // if the source observable throws an error, suppress the error and try again a specified number of times
        // number of repetitions is specified by a provided number
        // has no effect if the source never errors
        this.numbers$.pipe(
            retry(10),
        ).subscribe(v => console.log(v));

        // retryWhen
        // like retry, but retries the source when provided observable emits
        this.numbers$.pipe(
            retryWhen(() => range(1,1)),
        ).subscribe(v => console.log(v));

        // withLatestFrom
        // creates new observable that combines emissions from the source observable with the latest value from a provided observable
        this.numbers$.pipe(
            withLatestFrom(this.numbers2$)
        ).subscribe(v => console.log(v));

        // window
        // all emissions within a specified window of time are bundled into an array and emitted together
        // like buffer, but emissions are bundled into an array
        // a provided observable indicates when to "close" the window
        // new window is opened immediately
        // observable emits an array at this time
        // first window opens automatically

        // windowCount
        // like window, but shifts to the next window when the current window has accumulated a specified number of values

        // windowTime
        // like window, but shifts to the next window after the current window has been opened for a specified amount of time

        // windowWhen
        // like window, but opening observable is a factory function

        // windowToggle
        // like window, but takes two observables - one which opens a window and another which closes it
        // closing observable is a factory function, like bufferToggle

        // let
        // an operator which returns an observable that replaces the current one
        // receives the current observable as an argument
        // no exist in rxjs6

        // debounce
        // discard any values that are emitted within a specified period of time after the previous emission
        // like throttle, but with an initial value
        // duration is specified by a provided observable
        this.numbers$.pipe(
            debounce(() => timer(1000))
        ).subscribe(v => console.log(v));
        // debounceTime
        // like debounce, but duration is specified by a number
        this.numbers$.pipe(
            debounceTime(1000)
        ).subscribe(v => console.log(v));
    }
}
