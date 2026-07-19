import { useEffect, useState } from "react";

import type { Neuron } from "./types/Neuron";

import { shouldForget } from "./utils/memorySystem";

import {
    createNeuron as createNeuronDB,
    getAllNeurons,
    updateNeuron as updateNeuronDB,
    deleteNeuron
} from "./services/neuronService";

import BrainCanvas from "./components/BrainCanvas";
import NewMemoryModal from "./components/modals/NewMemoryModal";
import MemoryModal from "./components/modals/MemoryModal";

function App() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [neurons, setNeurons] = useState<Neuron[]>([]);

  const [selectedNeuron, setSelectedNeuron] = useState<number | null>(null);

  const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {

        async function loadNeurons() {

            const data = await getAllNeurons();

            setNeurons(data);

        }

        loadNeurons();

    }, []);

    useEffect(() => {

        const interval = setInterval(async () => {

            if (isDragging) return;

            await forgetDeadNeurons();

        },1000);

        return ()=>clearInterval(interval);

    },[isDragging]);

    async function createNeuron(
        title: string,
        area: string,
        content: string
    ) {

        const newNeuron: Neuron = {

            id: Date.now(),

            title,

            content,

            knowledgeArea: area,

            x: Math.random() * 900 + 50,

            y: Math.random() * 500 + 50,

            connections: [],

            reviewCount: 1,

            lastReview: Date.now()

        };

        await createNeuronDB(newNeuron);

        const data = await getAllNeurons();

        setNeurons(data);

    }

async function updateNeuron(updatedNeuron: Neuron) {

    await updateNeuronDB(updatedNeuron);

    const data = await getAllNeurons();

    setNeurons(data);

}

async function forgetDeadNeurons() {

    const data = await getAllNeurons();

    for (const neuron of data) {

        if (shouldForget(neuron)) {

            await deleteNeuron(neuron.id);

        }

    }

    const updated = await getAllNeurons();

    setNeurons(updated);

}

async function reviewNeuron(id: number) {

    const neuron = neurons.find(n => n.id === id);

    if (!neuron) return;

    // Revisa completamente o neurônio aberto
    await updateNeuronDB({

        ...neuron,

        reviewCount: neuron.reviewCount + 1,

        lastReview: Date.now()

    });

    // Dá uma leve fortalecida nos conectados
    for (const connectionId of neuron.connections) {

        const connected = neurons.find(
            n => n.id === connectionId
        );

        if (!connected) continue;

        const now = Date.now();

        const elapsed = now - connected.lastReview;

        const reducedElapsed = elapsed * 0.85;

        await updateNeuronDB({

            ...connected,

            lastReview: now - reducedElapsed

        });

    }

    const data = await getAllNeurons();

    setNeurons(data);

}

function moveNeuron(
    id:number,
    x:number,
    y:number
){

    setNeurons(current=>

        current.map(neuron=>

            neuron.id===id

            ?{
                ...neuron,
                x,y
            }

            :neuron
        )
    );}

async function saveNeuronPosition(id: number) {

    const neuron = neurons.find(n => n.id === id);

    if (!neuron) return;

    await updateNeuronDB(neuron);

}

const selectedNeuronData =
    neurons.find(
        neuron => neuron.id === selectedNeuron
    ) ?? null;


async function deleteNeuronById(id: number) {

    await deleteNeuron(id);

    const data = await getAllNeurons();

    setNeurons(data);

}


    return (
        <main
            style={{
                width: "100vw",
                height: "100vh",
                position: "relative",
            }}
        >
            
            <BrainCanvas
                neurons={neurons}
                onNeuronClick={(id) => {                
                    reviewNeuron(id);
                    setSelectedNeuron(id);
                }}
                onMoveNeuron={moveNeuron}
                onDragEnd={saveNeuronPosition}
                setIsDragging={setIsDragging}
            />
            <NewMemoryModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSave={createNeuron}
            />

            <MemoryModal
                neuron={selectedNeuronData}
                neurons={neurons}
                onClose={() => setSelectedNeuron(null)}
                onSave={updateNeuron}
                onDelete={deleteNeuronById}
            />

            <button onClick={() => setIsModalOpen(true)}
                style={{
                    position: "absolute",
                    right: 30,
                    bottom: 30,
                    width: 65,
                    height: 65,
                    borderRadius: "50%",
                    border: "none",
                    background: "#3b82f6",
                    color: "white",
                    fontSize: "34px",
                    cursor: "pointer",
                    boxShadow: "0 0 25px rgba(59,130,246,.5)",
                    zIndex: 1
                }}
            >
                +
            </button>
        </main>
    );
}

export default App;