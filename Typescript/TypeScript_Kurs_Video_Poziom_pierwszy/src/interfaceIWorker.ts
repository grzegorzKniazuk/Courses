import {JobPosition} from "./enumJobPosition";
import {Skill} from "./Skill";

interface IWorker {
    firstName : string;
    lastName? : string; // pole opcjonalne
    yearOfGranulation : number;
    languages : string[];
    hasDriverLicence : boolean;
    position : JobPosition;
    skills : Array<Skill>;
    getFullName : IInfoGeter;
}

interface IInfoGeter {
    () : string; // funkcja w interfejsie
}

export { IWorker, IInfoGeter }