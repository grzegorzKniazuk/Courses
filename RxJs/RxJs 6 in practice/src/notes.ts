import {fromEvent, interval, noop, Observable, timer} from "rxjs";

class Notes {

    public basics(): void {
        const interval$ = interval(1000); // Observable<number> // definicja strumienia
        const timer$ = timer(3000, 1000); // delay, interval

        const click$ = fromEvent(document, 'click');

        click$.subscribe(
            (event: MouseEvent) => {}, // next
            (error) => {},  // error
            () => {}); // complete

        const sub = interval$.subscribe((val) => { // strumien
            console.log(val);
        });

        setTimeout(() => sub.unsubscribe(), 5000);
    }

    public observableFromScratch(): void {
        const http$ = Observable.create((observer) => {
            fetch('/api/courses').then((response) => {
                return response.json();
            }).then((body) => {
                observer.next(body);
                observer.complete();
            }).catch((error) => {
                observer.error(error);
            });
        });

        http$.subscribe(
            (courses) => { console.log(courses) },
            noop(), // rxjs empty function
            () => { console.log('complete') });
    }
}
