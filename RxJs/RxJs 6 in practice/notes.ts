import { concat, forkJoin, fromEvent, interval, merge, noop, Observable, of, timer } from 'rxjs';
import {Course} from "./app/model/course";
import {
  catchError,
  concatMap,
  debounceTime, delayWhen,
  distinctUntilChanged,
  exhaustMap,
  filter, finalize,
  map,
  mergeMap, retryWhen,
  shareReplay, startWith, switchMap,
  tap, throttle, throttleTime, withLatestFrom,
} from 'rxjs/operators';
import {FormGroup} from "@angular/forms";
import {fromPromise} from "rxjs/internal-compatibility";
import {ElementRef, ViewChild} from "@angular/core";
import {Lesson} from "./app/model/lesson";
import {createHttpObservable} from "./app/common/util";
import {ActivatedRoute, Router} from "@angular/router";
import { debug, RxJsLoggingLevel } from 'debug';

class Notes {

    private readonly http$ = this.httpObservable('api/courses');
    private readonly interval$ = interval(1000); // Observable<number> // definicja strumienia
    private readonly timer$ = timer(3000, 1000); // delay, interval
    private readonly click$ = fromEvent(document, 'click'); // Observable from event
    private courses$: Observable<Course[]>;
    private lessons$: Observable<Lesson[]>;
    private beginnersCourses: Course[];
    private beginnersCourses$: Observable<Course[]>;
    private advancedCourses: Course[];
    private advancedCourses$: Observable<Course[]>;
    private form: FormGroup;
    private courseId: string;

    @ViewChild('saveButton') public saveButton: ElementRef;
    @ViewChild('searchInput') public searchInput: ElementRef;

    constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

    public basics(): void {
        this.click$.subscribe(
            (event: MouseEvent) => {}, // next
            (error) => {},  // error
            () => {}); // complete

        const sub = this.interval$.subscribe((val) => { // strumien
            console.log(val);
        });

        setTimeout(() => sub.unsubscribe(), 5000);

        this.http$.subscribe(
            (courses) => { console.log(courses) },
            noop(), // rxjs empty function
            () => { console.log('complete') });
    }

    // cancelable http observable
    public httpObservable(url: string): Observable<Course> {
        return Observable.create((observer) => {

            const controller = new AbortController(); // from fetchAPI
            const signal = controller.signal;

            fetch(url, { signal }).then((response) => {

                if (response.ok) { // error handler
                    return response.json();
                } else {
                    observer.error(`Request failed with status code: ${response.status}`);
                }


            }).then((body) => {
                observer.next(body);
                observer.complete();
            }).catch((error) => { // only fatal errors (browser, network)
                observer.error(error);
            });

            return () => { // observable cancel function
                return controller.abort();
            }
        });
    }

    // Map transform the items emitted by an Observable by applying a function to each item

    // shareReplay - zapobiega tworzeniu nowych strumieni dla kazdej z nowych subskrypcji (np dla http - kilka takich samych strzalow)
    public mapOperator() {
        return this.http$.pipe(
            catchError((error) => { // error handling
                console.log(error);
                return of([]) // try to recover data (here empty array)
            }),
            finalize(() => { // completes or error out
                console.log('finalize executed');
            }),
            tap(() => console.log('HTTP request executed')),
            map(response => Object.values(response['payload'])),
            shareReplay(), // shareReplay
        );
    }

    // retry error strategy
    public retryErrorStrategy() {
        return this.http$.pipe(
            tap(() => console.log('HTTP request executed')),
            map(response => Object.values(response['payload'])),
            shareReplay(), // shareReplay
            retryWhen((errors) => errors.pipe( // retry error strategy
                delayWhen(() => { // wyslij zapytanie ponownie po 2s
                    return timer(2000)
                })
            ))
        );
    }

    // imperative design
    public imperativeDesign(): void {
        this.courses$.subscribe((courses) => {
            this.beginnersCourses = courses.filter((course) => { // anti-pattern
                return course.category === 'BEGINNER';
            });
            this.advancedCourses = courses.filter((course) => { // anti-pattern
                return course.category === 'ADVANCED';
            });
        });
    }

    // reactive design
    public reactiveDesign(): void {
        this.beginnersCourses$ = this.courses$.pipe(map((courses: Course[]) => {
            return courses.filter((course: Course) => {
                return course.category === 'BEGINNER';
            });
        }));
    }

    // observable concatenation
    // concat operator - concatenates multiple Observables together by sequentially emitting their values, one Observable after the other
    public observableContatenation(): void {
        const source1$ = of(1, 2, 3);
        const source2$ = of(4, 5, 6);
        const source3$ = of(7, 8, 9);

        // jesli source1$ nigdy sie nie zakonczy source2$ i source3$ nigdy sie nie wykonaja
        concat(source1$, source2$, source3$).subscribe(values => console.log(values)); // 1 2 3 4 5 6 7 8 9
    }

    public concatMap(): void {
        this.form.valueChanges
            .pipe(
                filter(() => this.form.invalid),
                concatMap(changes => this.saveCourse(changes)), // wyemituj kolejna wartosc dopiero gdy ostatnia zostanie zapisana
            )
            .subscribe();
    }

    public saveCourse(changes): Observable<any> {
        return fromPromise(fetch(`/api/courses/${this.course.id}`, {
            method: 'PUT',
            body: JSON.stringify(changes),
            headers: {
                'content-type': 'application/json',
            }
        }));
    }


    // merge operator - flattnes multiple Observables together by blending their values into one Observable
    public merge(): void {
        const interval1$ = interval(1000);
        const interval2$ = interval1$.pipe(map(value => 10 * value));

        const result$ = merge(interval1$, interval2$);

        result$.subscribe(value => console.log(value)); // 0 1 10 2 20  30 4 40 ...
    }

    // mergeMap operator - maps each value to an Observable, then flattens all of these inner Observables using mergeAll
    public mergeMap(): void {
        this.form.valueChanges
            .pipe(
                filter(() => this.form.invalid),
                mergeMap(changes => this.saveCourse(changes)), // wyemituj kolejna nie czekajac gdy ostatnia zostanie zapisana
            )
            .subscribe();
    }

    // exhaustMap operator - ignoruje wszystkie pozostałe póki ostatni nie zostanie wykonany
    // Maps each value to an Observable, then flattens all of these inner Observables using exhaust
    public exhaustMap(): void {
        fromEvent(this.saveButton.nativeElement, 'click')
            .pipe(
                exhaustMap(() => this.saveCourse(this.form.value)) // ignore repeated clicks
            )
    }


    public cancelableObservable(): void {
        const interval1$ = interval(1000);

        const sub = interval1$.subscribe(console.log);

        setTimeout(() => sub.unsubscribe(), 5000);
    }

    // switchMap, commonly used for implementing search
    // Maps each value to an Observable, then flattens all of these inner Observables using switch
    public switchMap(): void {
        this.courseId = this.activatedRoute.snapshot.params['id'];

        this.courses$ = createHttpObservable(`/api/courses/${this.courseId}`);


        const searchLessons$ = fromEvent(this.searchInput.nativeElement, 'keyup')
            .pipe(
                map((event: any) => event.target.value),
                startWith(''),
                debounceTime(500), // waiting for a value to become stable
                throttleTime(1000),
                throttle(() => interval(1000)), // like throttleTime but silence duration is deermined by a second Observable
                distinctUntilChanged(), // no longer duplicate values in our output
                switchMap((search) => this.loadLessons(search))
            );

        const initialLessons$ = this.loadLessons();

        this.lessons$ = concat(initialLessons$, searchLessons$);
    }

    public loadLessons(search?): Observable<Lesson[]> {
        return createHttpObservable(`/api/lessons?courseId=${this.courseId}&pageSize=100&filter=${search}`)
            .pipe(
                debug(RxJsLoggingLevel.INFO, "search"),
                map((response) => response['payload'])
            );
    }

    // forkJoin (like concat)
    // allow to launch several task in parallel,
    // wait for those tasks to complete and then we can get back the results of each task and use those combined results together
    public getLessons(): void {
        forkJoin(this.courses$, this.lessons$).subscribe(([courses, lessons]) => {

        });
    }

    // withLatestFrom() - bierze ostatnia wartosc z podanego strumienia i dodaje do strumienia - nie trzeba wyciagac jej recznie
    public withLatestFromExample(): void {
      this.loadLessons()
          .pipe(withLatestFrom(this.courses$))
          .subscribe(([lessons, courses]) => {

          });
    }
}
