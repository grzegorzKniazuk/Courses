// IMPORT ---------------------------- //
import { JobPosition } from "./enumJobPosition";
import { IWorker, IInfoGeter } from "./interfaceIWorker";
import { IManager } from "./interfaceIManager";
import { Worker } from "./Worker";
import { Skill } from "./Skill";
import { TeamLeader } from "./TeamLeader";

// ----------------------------------- //

let getFullName = (worker : IWorker) : string => worker.firstName + ' ' + worker.lastName; // arrow funcion z jednym parametrem

let getJobPosition = (worker : IWorker) : JobPosition => worker.position; // enum jako typ zwracany

let getDisplayOfJobPosition = (job : JobPosition) : string => JobPosition[job];

function getDefaultPosition() : JobPosition {
    return JobPosition.Admin; // zwrocenie wartosci domyslnej
}

// wartosc domyslna jako funkcja
function getWorkingOnPosition(workers : Array<IWorker>, job : JobPosition = getDefaultPosition()) : Array<string> {
    let result: string[] = [];

    for (let worker of workers) {
        if (worker.position === job) {
            result.push(getFullName(worker));
        }
    }

    return result;
}

function showWorkerDetailedInfo(worker : IWorker) : void {
    let yearsAfterGraduation : number = (new Date().getFullYear()) - worker.yearOfGranulation,
        fullName : string = worker.firstName + ' ' + worker.lastName;

    if (worker.hasDriverLicence) {
        console.log('Can drive a car');
    }
    if (worker.languages) {
        console.log('Knows: ');
        worker.languages.forEach((language : string) => console.log(language));
    } else {
        console.log('Knows no extra languages');
    }
}

// parametr domyslny z zalozenia jest tez opcjonalny
function setUserData(index : number, yearOfGranulation : number = 2010, hasDriverLicence? : boolean) { // paramery domyslne i opcjonalne
    let worker : IWorker = workers[index];
    if (yearOfGranulation) {
        worker.yearOfGranulation = yearOfGranulation;
    }
    if (worker.hasDriverLicence) {
        worker.hasDriverLicence = hasDriverLicence;
    }
    return worker;
}

// grupowanie parametrow
function setUserLanguages(index : number, ...languages : string[]) : IWorker {
        let worker : IWorker = workers[index];
        if (languages && languages.length > 0) {
            worker.languages = languages;
        }
        return worker;
}

function addWorker(newWorker : Worker) : Array<Worker> {
    workers.push(newWorker);
    return workers;
}

function getFullNameOfWorker() : string {
    return this.firstName + ' ' + this.lastName;
}

function wontGiveFullName() : string {
    return this.firstName + ' wont give full name';
}

function setTeam(team : Array<IWorker>) : void {
    this.team = team;
}

let workers  : Array<Worker> = [];

let firstWorker = new Worker(0, 'Karol', 'Rogowski', 2009,['German', 'English'], true, JobPosition.Admin, [new Skill(3, 'Programming')]);
let secondWorker = new Worker(0, 'Jan', 'Kowalski', 2000,null, false, JobPosition.Designer, [new Skill(3, 'Programming')]);

workers.push(firstWorker, secondWorker);

showWorkerDetailedInfo(setUserLanguages(0, 'lang1', 'lang2', 'lang3'));
getWorkingOnPosition(workers).forEach(fullname => console.log(fullname));
showWorkerDetailedInfo(setUserData(0));

let newWorker : IManager = // wymuszanie typu
    {
        firstName : 'Adam',
        lastName : 'Tyron',
        yearOfGranulation : 2007,
        languages : ['French', 'English'],
        hasDriverLicence : false,
        position : JobPosition.Admin,
        skills : null,
        getFullName : wontGiveFullName,
        team : null,
        setTeam : setTeam
    };

// wyrazenia klasowe
// deklarowowanie wyrazen ktore zachowuja sie za klasy, dla klas uzywanych lokalnie
let ExampleClass = class {
    constructor(public id : number, public name : string) {} ;
    showIdAndName() {
        return 'id: ' + this.id + ' name: '+ this.name;
    }
};

let exampleInstance = new ExampleClass(5, 'Placek');
exampleInstance.showIdAndName();

// funkcja generyczna, <T> - parametr generyczny
function DistinctPush<T>(array : Array<T>, newElement : T) : Array<T> {
    if (array.indexOf(newElement) === -1) array.push(newElement);
    return array;
}

let numbers = new Array<number>();