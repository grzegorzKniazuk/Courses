import { ChangeDetectionStrategy, Component } from '@angular/core';
import { empty, from, interval, of, range, timer } from 'rxjs';
import { filter, first, map, mapTo, pluck, startWith, take, tap } from 'rxjs/operators';

@Component({
    selector: 'app-basic-operators',
    templateUrl: './basic-operators.component.html',
    styleUrls: [ './basic-operators.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicOperatorsComponent {

    private numbers$ = range(1,10);

    ngOnInit() {
        this.basicOperators();
    }

    private basicOperators(): void {
        /*
        // range
        range(1, 5).subscribe(number => console.log(number)); // 1, 2, 3, 4, 5

        // of - convert value to observable
        of([1, 2, 3, 4, 5]).subscribe(v => console.log(v)); // [1, 2, 3, 4, 5]

        // from
        // converts an array, promise or iterator into an observable
        from(this.fibonacciGenerator()).pipe(take(20)).subscribe(v => console.log(v));
        // 2 3  8 13 21 34 55 ...

        // interval(duration)
        // emits a value each time the specified duration passes
        interval(1000).subscribe(v => console.log(v)); // 1, 2, 3 ... with 1s interval

        // timer(duration, [interval])
        // emits once after the specified duration has passed (like setTimeout)
        // If a second argument is passed, it will then emit each time that interval passes, indefinitely
        timer(1000).subscribe(v => console.log(v)); // 0, after 1s
        timer(1000, 1000).subscribe(v => console.log(v)); // 0, 1, 2, 3... , with 1s interval

        // empty (depracated - use EMPTY const)
        // creates an observable with completes immediately and returns no values
        // useful for testing, corner cases
        empty().subscribe(v => console.log(v)); // nothing ...

        // map
        // equivalent to JavaScript's array.prototype.map
        // converts each element to something new, based on provided 'mutator'
        this.numbers$.pipe(
            map((v) => v * v)
        ).subscribe(v => console.log(v)); // 1, 4, 9, 16, 25, 36, 49, 64, 81, 100

        // mapTo
        // converts each emitted value into a new value, without regard for the emitted value
        this.numbers$.pipe(
            mapTo({ type: 'number' })
        ).subscribe(v => console.log(v)); // 10x { type: 'number' }

        // filter
        // equivalent to array.prototype.filter
        // creates an observable that only emits the latest value from the source observable if it passes a predicate function
        this.numbers$.pipe(
            filter((v) => !!(v % 2))
        ).subscribe(v => console.log(v)); // 1, 3, 5, 7, 9

        // tap
        // does a thing
        // discreetly executes a side-effect such as console.logs
        this.numbers$.pipe(
            tap((v) => console.log(v)) // 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
        ).subscribe();

        // pluck
        // used to map an observable of similar objects to a single property of those objects
        // string as argument, equal that string will be plucked
        this.numbers$.pipe(
            map(v => ({ nr: v, squareNr: v * v})),
            pluck('squareNr') // wyciaga to property z mapowanego obiektu
        ).subscribe(v => console.log(v)); // 1, 4, 9, 16, 25, 36, 49, 64, 81, 100

        // first
        // equivalent to array.prototype.find
        // creates an observable which completes as soon as the source observable emits an acceptable value
        // useful for extracting a value rom an observable that will not complete, or that will take a long time to complete
        this.numbers$.pipe(
            first(v => v > 3)
        ).subscribe(v => console.log(v)); // 4
        */
        // startWith
        // Creates a new observable that emits a provided value, thne emits values from the source observable
        // useful for asynchronous observables that may not return a value for some time
        this.numbers$.pipe(
            startWith(10),
            first()
        ).subscribe(v => console.log(v)); // 10
    }

    private * fibonacciGenerator() {
        let a = 1;
        let b = 1;
        while (true) {
            let c = a + b;
            a = b;
            b = c;
            yield c;
        }
    }
}
