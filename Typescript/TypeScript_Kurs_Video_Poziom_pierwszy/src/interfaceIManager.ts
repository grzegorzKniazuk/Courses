// rozszerzanie interfejsow

import { IWorker } from "./interfaceIWorker";

interface IManager extends IWorker {
    team : Array<IWorker>;
    setTeam : (team : Array<IWorker>) => void;
}

export { IManager }