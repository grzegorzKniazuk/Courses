import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { concat, from, fromEvent, interval, merge, Observable, of, range, timer } from 'rxjs';
import { buffer, bufferCount, bufferTime, bufferWhen, concatAll, concatMap, concatMapTo, delay, delayWhen, filter, groupBy, ignoreElements, last, map, mergeAll, mergeMap, partition, reduce, sample, scan, single, skip, skipUntil, skipWhile, take, takeUntil, takeWhile, throttleTime, timeout, toArray } from 'rxjs/operators';
import { fromArray } from 'rxjs/internal/observable/fromArray';

@Component({
    selector: 'app-intermediate-operators',
    templateUrl: './intermediate-operators.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntermediateOperatorsComponent implements OnInit {

    private readonly numbers$ = range(1, 10);
    private readonly numbers2$ = range(11, 10);

    private readonly bluePostFeed = interval(1000).pipe(map(v => `bluePostFeed #${v}`));
    private readonly redPostFeed = interval(650).pipe(map(v => `redPostFeed #${v}`));
    private readonly greenPostFeed = interval(1650).pipe(map(v => `greenPostFeed #${v}`));

    private readonly config = {
        blue: this.bluePostFeed,
        red: this.redPostFeed,
        green: this.greenPostFeed,
    };

    private readonly colors = [ 'blue', 'red', 'green' ];

    ngOnInit() {
        this.intermediateOperatorsExamples();
    }
    private intermediateOperatorsExamples(): void {
        // delay
        // emits values from the source array only after a specified duration has passed
        // duration is specified as a number
        this.numbers$.pipe(
            delay(1000),
        ).subscribe(v => console.log(v)); // ...1,2,3,4,5,6,7,8,9,10 ALL values emitted after one second

        // delayWhen
        // like delay but instead of a number, a method which returns the duration of the delay is provided
        this.numbers$.pipe(
            delayWhen(n => timer(n * 1000)),
        ).subscribe(v => console.log(v)); /// 1, 2, 3... emit one value per second

        // take
        // emits only the first few X values of the source observable
        // number of emitted values is specified by provided number
        // complete the stream
        this.numbers$.pipe(
            take(5),
        ).subscribe(v => console.log(v)); /// 1, 2, 3, 4, 5

        // takeWhile
        // like take, but emits values from the source only until a provided predicate return false
        // passing values subsequent to the first failing value will not be emitted
        // this is unlike filter
        // complete the stream
        this.numbers$.pipe(
            takeWhile(v => v < 6),
        ).subscribe(v => console.log(v)); /// 1, 2, 3, 4, 5

        // takeUntil
        // like take, but emits values from the observable only until provided observable emits
        // common example: timer
        // complete the stream
        this.numbers$.pipe(
            takeUntil(timer(1000)),
        ).subscribe(v => console.log(v)); /// 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ALL values emitted after one second

        // throw
        // creates an observable with immediately enters an error state while emitting no values
        // useful for testing error handling
        Observable.throw().subscribe(v => console.log(v), e => console.log(e));

        // skip
        // ignores the first few elements of a source observable
        this.numbers$.pipe(
            skip(5),
        ).subscribe(v => console.log(v)); // 6 7 8 9 10

        // skipWhile
        // ignores elements from a source observable until a provided predicate function returns false
        this.numbers$.pipe(
            skipWhile(v => v <= 5),
        ).subscribe(v => console.log(v)); // 6 7 8 9 10

        // skipUntil
        // ignores elements from a source observable until a provided observable emits a value
        this.numbers$.pipe(
            skipUntil(timer(1000)),
        ).subscribe(v => console.log(v)); // ?

        // last
        // returns the last element of a source observable to pass a predicate, after that observable completes
        // unlike first, source must complete
        this.numbers$.pipe(
            last(),
        ).subscribe(v => console.log(v)); // 10

        // concat
        // loosely equivalent to array.prototype.concat
        // creates an observable which emits all values from a source observable,
        // then emits all values from a provided observable
        concat(this.numbers$, this.numbers2$).subscribe(v => console.log(v)); // 1 ... 20

        // concatAll
        // when a source observable emits other observables, subscribe to each one and emit its values
        // does not subscribe to one observable until the previous one completes
        of(
            range(1,3),
            interval(100),
            take(5),
        ).subscribe(v => console.log(v)); // Object Object function

        of(
            range(1,3),
            interval(100),
            take(10),
        ).pipe(concatAll()).subscribe(v => console.log(v)); // 1 2 3 0 1 2 3 ....

        // concatMap
        // like map, but the value returned from the mutator must be an observable
        // the observable returned from the mutator is subscribed to
        // results are passed to the next observer
        interval(1000)
        .pipe(map(n => range(0, n + 1)))
        .subscribe(v => console.log(v)); // RangeObservable
        // vs
        interval(1000)
        .pipe(concatMap(n => range(0, n + 1)))
        .subscribe(v => console.log(v)); // 0, 0 1, 0 2, 0 1 2 3, 0 1 2 3 4, 0 1 2 3 4 5...

        // concatMapTo
        // like concatMap, but maps to a constant observable with no regard for the incoming values
        interval(1000)
        .pipe(concatMapTo(range(1, 3)))
        .subscribe(v => console.log(v)); // 1 2 3, 1 2 3, 1 2 3, 1 2 3 ...

        // single
        // emits just one value which passes a predicate function, after the source observable completes
        // if more than one value passes the predicate, an error will be thrown (this is unlike first)
        this.numbers$.pipe(
            single(v => v > 3)
        ).subscribe(v => console.log(v)); // error

        this.numbers$.pipe(
            single(v => v === 9)
        ).subscribe(v => console.log(v)); // 9

        // ignoreElements
        // doesn't emit and values from source observable, but does emit an error or complete state from the source
        // usage is obscure
        this.numbers$.pipe(
            ignoreElements()
        ).subscribe(v => console.log(v)); // nothing

        this.numbers$.pipe(
            ignoreElements()
        ).subscribe(v => console.log(v), ()=>{}, () => console.log('complete')); // 'complete'

        // sample
        // emits the latest element from source observable at a specified interval
        // useful if the frequency at which new elements are added, and the frequency as which you need to access, vary greatly
        this.numbers$.pipe(
            sample(interval(1000))
        ).subscribe(v => console.log(v));

        // reduce
        // equivalent to array.prototype.reduce
        // aggregate all the elements of an observable after it completes
        this.numbers$.pipe(
            reduce((acc, v)  => acc + v)
        ).subscribe(v => console.log(v)); // 55

        // scan
        // every time the source observable emits, aggregate all the values so far and emit the aggregated value
        // like reduce, but emits multiple times
        this.numbers$.pipe(
            scan((acc, v)  => acc + v)
        ).subscribe(v => console.log(v)); // 1 3 6 10 15 21 28 36 45 55

        // groupBy
        // separate all the emitted values into groups based on an accessor
        // emit each of those groups as an observable
        this.numbers$.pipe(
            groupBy(v => v % 2 === 0),
            mergeMap(group => group),
            toArray() // stream must completes
        ).subscribe(v => console.log(v)); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

        // timeout
        // creates an observable that throwns an error if the source observable waits longer than the specified
        // duration to emit two consecutive values
        // once source completes, timeout no longer applies
        this.numbers$.pipe(
            timeout(1000)
        ).subscribe(v => console.log(v)); // no error

        this.numbers$.pipe(
            delay(1500),
            timeout(1000)
        ).subscribe(v => console.log(v)); // ERROR Object { message: "Timeout has occurred", name: "TimeoutError", stack: "" }

        // fromEvent
        // creates an observable which emits values as they come in from a generic event source
        // event source can be many common javascript form controls - button text input dom elements etc
        fromEvent(document, 'click').subscribe(e => console.log(e));

        // merge
        // creates new observable which combines the source and provided observable
        // works like concat, but all observables are subscribed to at once - does not wait for previous observable to complete to start next one
        // hard to determine post-merge what the source was
        merge(this.bluePostFeed, this.redPostFeed)
            .subscribe(v => console.log(v));

        // mergeAll
        // merges all provided observables to one observable
        of(
            this.bluePostFeed,
            this.redPostFeed,
            this.greenPostFeed
        ).pipe(
            mergeAll()
        ).subscribe(v => console.log(v));

        // mergeMap
        // if the source observable emits observables, continuously subscribe to those and emit any value that comes from any of them
        fromArray(this.colors).pipe(
            mergeMap(color => this.config[color]),
        ).subscribe(v => console.log(v));

        // buffer
        // collects values from source observable until provided observable emits
        // provided observable can emit anything
        // collected values are emitted as an array
        // starts buffering again immediately

        // bufferCount
        // like buffer, but waits until a specified number of values are emitted from a source before emitting buffered values
        this.numbers$.pipe(
            bufferCount(5),
        ).subscribe(v => console.log(v)); // [1, 2, 3, 4, 5], [6, 7, 8, 9, 10]

        // bufferTime
        // like buffer, but waits a specified amount of time before emitting buffered values
        this.numbers$.pipe(
            bufferTime(500),
        ).subscribe(v => console.log(v)); // [1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

        // bufferToggle
        // like buffer, but takes two arguments - an opening and closing observable - closing observable is provided a factory function
        // buffer start a buffer when opening observable emits
        // emits values when closing observable emits
        // can have multiple buffers going simultaneously

        // bufferWhen
        // like bufferToggle, but requires no opening observable
        // like buffer, but factory function is provided instead of observable
        this.numbers$.pipe(
            bufferWhen(() => timer(500)),
        ).subscribe(v => console.log(v));

        // partition
        // separates stream into two groups - one that passes the predicate, and one does not
        // like combining the results of filter with everything that was filtered out
        const [evens, odds] = this.numbers$.pipe(partition(val => val % 2 === 0));
        // throttle
        // does not emit any observables until a duration of time, specified by the provided observable, has passed between source emissions
        // only emits the latest value

        // throttleTime
        // like throttle, except duration is determined by a specified number and not an observable
        this.numbers$.pipe(
            throttleTime(100000)
        ).subscribe(v => console.log(v)); // ostatnia wartosc co 1000ms
    }
}
