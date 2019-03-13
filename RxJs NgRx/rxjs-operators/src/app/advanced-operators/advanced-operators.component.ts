import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { combineLatest, forkJoin, interval, range, timer, zip } from 'rxjs';
import { mapTo } from 'rxjs/operators';

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
        /*
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
        */
        // publish


        // share


        // multicast
    }
}
