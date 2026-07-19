import { memoryFill } from "../utils/memorySystem";
import type { Neuron } from "../types/Neuron";

type NeuronProps = {
    neuron: Neuron;
    justDragged: boolean;
    onClick: (id: number) => void;
    onMouseDown: (id: number) => void;
    onMouseEnter:()=>void;
    onMouseLeave:()=>void;
    hoveredNeuron: number | null;
};

function NeuronNode({
    neuron,
    justDragged,
    onClick,
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
    hoveredNeuron
}: NeuronProps) {

    const fill = memoryFill(neuron);
    const isHovered = hoveredNeuron === neuron.id;

    return (
        <div
            onClick={() => {

                if (justDragged) return;

                onClick(neuron.id);

            }}

            onMouseDown={(e) => {

                e.stopPropagation();

                if (!e.shiftKey) return;

                onMouseDown(neuron.id);

            }}

            onMouseEnter={onMouseEnter}

            onMouseLeave={onMouseLeave}

            style={{
                position: "absolute",
                        
                left: neuron.x,
                top: neuron.y,
                        
                width: isHovered ? 20 : 18,
                height: isHovered ? 20 : 18,
                        
                borderRadius: "50%",
                        
                border: isHovered
                    ? "2px solid #3b82f6"
                    : "2px solid white",
                        
                background: isHovered
                    ? "#3b82f6"
                    : `rgba(255,255,255,${fill})`,
                        
                boxShadow: isHovered
                    ? "0 0 18px #3b82f6"
                    : `0 0 ${10 * fill}px rgba(255,255,255,${fill})`,
                        
                cursor: "pointer",
                        
                transform: isHovered ? "scale(1.08)" : "scale(1)",
                        
                transition: "background .25s, box-shadow .25s, transform .2s",

                animation: `floatNeuron ${7 + (neuron.id % 5)}s ease-in-out infinite`,

                animationDelay: `${(neuron.id % 20) / 2}s`,
            }}
        />
    );
}

export default NeuronNode;