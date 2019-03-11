import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { interval, range } from 'rxjs';
import { concatMap, concatMapTo, first, ignoreElements, map, single } from 'rxjs/operators';

@Component({
    selector: 'app-intermediate-operators',
    templateUrl: './intermediate-operators.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntermediateOperatorsComponent implements OnInit {

    private readonly numbers$ = range(1, 10);
    private readonly numbers2$ = range(11, 10);

    ngOnInit() {
        this.intermediateOperatorsExamples();
    }

    private intermediateOperatorsExamples(): void {
        /*
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
        */

    }
}
