import { db } from "../database/db";
import type { Neuron } from "../types/Neuron";

export async function getAllNeurons(): Promise<Neuron[]> {
    return await db.neurons.toArray();
}

export async function createNeuron(neuron: Neuron) {
    await db.neurons.add(neuron);
}

export async function updateNeuron(neuron: Neuron) {
    await db.neurons.put(neuron);
}

export async function deleteNeuron(id: number) {
    await db.neurons.delete(id);
}


