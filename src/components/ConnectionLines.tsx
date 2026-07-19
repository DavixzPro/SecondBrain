import type { Neuron } from "../types/Neuron";

type Props = {
    neurons: Neuron[];
    hoveredNeuron: number | null;
};

function ConnectionLines({ neurons, hoveredNeuron }: Props) {


    return (
        <svg
            style={{
                position: "absolute",
                inset: 0,
                width: window.innerWidth,
                height: window.innerHeight,
                pointerEvents: "none",
            }}
        >
            {neurons.flatMap((neuron) =>
                neuron.connections.map((connectionId) => {

                    const target = neurons.find(
                        (n) => n.id === connectionId
                    );

                    if (!target) {
                        return [];
                    }


                    const highlighted =

                    neuron.id === hoveredNeuron ||

                    target.id === hoveredNeuron;

                    return (
                        <line
                            key={`${neuron.id}-${target.id}`}
                            x1={neuron.x + 9}
                            y1={neuron.y + 9}
                            x2={target.x + 9}
                            y2={target.y + 9}
                            stroke={highlighted ? "#3b82f6" : "white"}
                            strokeWidth={highlighted ? 4 : 2}
                            style={{
                                transition: "stroke .25s ease, stroke-width .25s ease",
                            }}
                        />
                    );
                })
            )}
        </svg>
    );
}

export default ConnectionLines;