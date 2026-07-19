import type { Neuron } from "../types/Neuron";

export function daysSinceReview(neuron: Neuron): number {

    const now = Date.now();

    const diff = now - neuron.lastReview;

    return diff / 10000;
    //return diff / (1000 * 60 * 60 * 24);

}

export function memoryResistance(reviewCount: number): number {

    return Math.pow(2, reviewCount - 1);

}

export function memoryFill(neuron: Neuron): number {

    const days = daysSinceReview(neuron);

    const resistance = memoryResistance(neuron.reviewCount);

    const fill = 1 - (days / resistance);

    return Math.max(0, Math.min(1, fill));

}

export function shouldForget(neuron: Neuron): boolean {

    const days = daysSinceReview(neuron);

    const resistance = memoryResistance(neuron.reviewCount);

    return days > resistance + 1;

}