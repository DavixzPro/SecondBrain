import Dexie, { type Table } from "dexie";
import type { Neuron } from "../types/Neuron";

class SecondBrainDatabase extends Dexie {

    neurons!: Table<Neuron, number>;

    constructor() {

        super("SecondBrainDB");

        this.version(1).stores({
            neurons: "id"
        });

    }

}

export const db = new SecondBrainDatabase();