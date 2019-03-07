import { AsyncSubject, BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { Course } from 'src/app/model/course';
import { fromPromise } from 'rxjs/internal-compatibility';

export class Store<T> {

  // subjects description
  public readonly subject: Subject<T> = new Subject();
  public readonly asyncSubject: AsyncSubject<T> = new AsyncSubject(); // czeka na complete() przez wyemitowaniem jakiejkolwiek wartosci i emituje ostatnia wartosc
  public readonly replaySubject: ReplaySubject<T> = new ReplaySubject(); // replay the complete observable (wszystkie wartosci) to all late subscribers

  // store
  private readonly _courses$ = new BehaviorSubject<Course[]>([]);
  public courses$: Observable<Course[]> = this._courses$.asObservable();

  public init(): void { // store init implementation here with data send to subject
    this._courses$.next([]);
  }

  saveCourse(courseId: number, changes): Observable<any> {
    const courses = this._courses$.getValue(); // pobieranie aktualnej wartosci ze strumienia

    const courseIndex = courses.find(course => course.id === courseId);

    const newCourses = courses.slice(0);

    // nie mutujemy starego obiektu a tworzymy nowy aby zmiany zostaly wykryte w komponentach
    newCourses[courseIndex] = {
      ...courses[courseIndex],
      ...changes
    };

    this._courses$.next(newCourses);

    return fromPromise(fetch(`/api/courses/${courseId}`, {
      method: 'PUT',
      body: JSON.stringify(changes),
      headers: {
        'content-type': 'application/json'
      }
    }));
  }
}
