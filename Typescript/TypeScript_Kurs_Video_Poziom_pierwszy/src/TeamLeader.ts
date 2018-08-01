import { Worker } from "./Worker";
import {JobPosition} from "./enumJobPosition";
import {Skill} from "./Skill";

class TeamLeader extends Worker{
    constructor(id : number,
                public firstName : string,
                public lastName : string,
                public yearOfGranulation : number,
                public languages : string[],
                public hasDriverLicence : boolean,
                public position : JobPosition,
                public skills : Array<Skill>,
                private yearsAsLeader : number) { // wlasciwosc tylko dla TeamLeader
        super(id, firstName, lastName, yearOfGranulation, languages, hasDriverLicence, position, skills);
    }
    public getFullName() : string {
        return super.getFullName() + '. ' + this.yearsAsLeader + ' as a leader';
    }
}

export { TeamLeader }