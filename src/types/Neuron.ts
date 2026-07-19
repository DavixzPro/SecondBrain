export interface Neuron {

    id:number;

    title:string;

    content:string;

    knowledgeArea:string;

    x:number;

    y:number;

    connections:number[];

    reviewCount: number;

    lastReview: number;

}