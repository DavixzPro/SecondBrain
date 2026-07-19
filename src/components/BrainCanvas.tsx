import NeuronComponent from "./Neuron";
import { useState } from "react";
import type { Neuron } from "../types/Neuron";
import ConnectionLines from "./ConnectionLines";

type BrainCanvasProps = {
    neurons:Neuron[];
    onNeuronClick:(id:number)=>void;
    onMoveNeuron:(id:number,x:number,y:number)=>void;
    onDragEnd: (id: number) => void;
    setIsDragging: (dragging: boolean) => void;
}

function BrainCanvas({neurons, onNeuronClick, onMoveNeuron, onDragEnd, setIsDragging}:BrainCanvasProps){

    const [draggingNeuron, setDraggingNeuron] = useState<number | null>(null);
    const [justDragged, setJustDragged] = useState(false);
    const [hoveredNeuron, setHoveredNeuron] = useState<number | null>(null);

    return (

        <div
            style={{
                width:"100%",
                height:"100%",
                position:"relative",
                overflow:"hidden",
                zIndex: 1,
                background:
                    "radial-gradient(circle at center,#1e293b,#0f172a)"
            }}

            onMouseDown={() => {
                        
                setIsDragging(true);
                        
            }}

            onMouseMove={(e)=>{

                if(draggingNeuron===null) return;

                onMoveNeuron(
                
                    draggingNeuron,
                
                    e.clientX-9,
                
                    e.clientY-9
                
                );
            
            }}

            onMouseUp={() => {

                if (draggingNeuron !== null) {
                
                    onDragEnd(draggingNeuron);
                
                    setJustDragged(true);
                
                    setTimeout(() => setJustDragged(false), 100);
                
                }
            
                setDraggingNeuron(null);
            
                setIsDragging(false);
            
            }}
        >

            <ConnectionLines neurons={neurons} hoveredNeuron={hoveredNeuron}/>

            {neurons.map((neuron)=>(

            <NeuronComponent
                key={neuron.id}
                neuron={neuron}
                justDragged={justDragged}
                onClick={onNeuronClick}
                onMouseDown={(id) => {
                    setIsDragging(true)
                    setDraggingNeuron(id);
                }}
                onMouseEnter={() => setHoveredNeuron(neuron.id)}
                onMouseLeave={() => setHoveredNeuron(null)}
                hoveredNeuron={hoveredNeuron}
            />

            ))}

        </div>

    );

}

export default BrainCanvas;