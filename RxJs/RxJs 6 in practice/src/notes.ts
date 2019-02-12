import {concat, fromEvent, interval, merge, noop, Observable, of, timer} from "rxjs";
import {Course} from "./app/model/course";
import {concatMap, exhaustMap, filter, map, mergeMap, shareReplay, tap} from "rxjs/operators";
import {FormGroup} from "@angular/forms";
import {fromPromise} from "rxjs/internal-compatibility";
import {ElementRef, ViewChild} from "@angular/core";

class Notes {

    private readonly http$ = this.httpObservable('api/courses');
    private readonly interval$ = interval(1000); // Observable<number> // definicja strumienia
    private readonly timer$ = timer(3000, 1000); // delay, interval
    private readonly click$ = fromEvent(document, 'click'); // Observable from event
    private readonly courses$: Observable<Course[]> = this.mapOperator();
    private beginnersCourses: Course[];
    private beginnersCourses$: Observable<Course[]>;
    private advancedCourses: Course[];
    private advancedCourses$: Observable<Course[]>;
    private form: FormGroup;

    @ViewChild('saveButton') public saveButton: ElementRef;

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

    public httpObservable(url: string): Observable<Course> {
        return Observable.create((observer) => {
            fetch(url).then((response) => {
                return response.json();
            }).then((body) => {
                observer.next(body);
                observer.complete();
            }).catch((error) => {
                observer.error(error);
            });
        });
    }

    // Map transform the items emitted by an Observable by applying a function to each item

    // shareReplay - zapobiega tworzeniu nowych strumieni dla kazdej z nowych subskrypcji (np dla http - kilka takich samych strzalow)
    public mapOperator(): Observable<Course[]> {
        return this.http$.pipe(
            tap(() => console.log('HTTP request executed')),
            map((response) => Object.values(response['payload']),
            shareReplay() // shareReplay
        ));
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
}
