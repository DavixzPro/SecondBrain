import { useEffect, useState } from "react";
import type { Neuron } from "../../types/Neuron";
import ConnectionsList from "../connections/ConnectionsList";

type MemoryModalProps = {
    neuron: Neuron | null;
    neurons: Neuron[];
    onClose: () => void;
    onSave: (updatedNeuron: Neuron) => void;
    onDelete: (id: number) => void;
};

function MemoryModal({neuron, neurons, onClose, onSave, onDelete}: MemoryModalProps) {
    const [title, setTitle] = useState("");
    const [area, setArea] = useState("");
    const [content, setContent] = useState("");
    const [connections, setConnections] = useState<number[]>([]);

    useEffect(() => {

    if (!neuron) return;

        setTitle(neuron.title);
        setArea(neuron.knowledgeArea);
        setContent(neuron.content);
        setConnections(neuron.connections);

    }, [neuron?.id]);

    if (!neuron) return null;


    function toggleConnection(id: number) {

        if (connections.includes(id)) {

            setConnections(
                connections.filter(connection => connection !== id)
            );

        } else {

            setConnections([
                ...connections,
                id
            ]);

        }

    }

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,.45)",
                backdropFilter: "blur(8px)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1
            }}
        >
            <div
                style={{
                    width: 700,
                    maxHeight: "85vh",
                    overflowY: "auto",
                    background: "#111827",
                    padding: 35,
                    borderRadius: 18,
                    color: "white",
                    boxShadow: "0 0 40px rgba(0,0,0,.45)",
                    border: "1px solid rgba(255,255,255,.08)",
                }}
            >

                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Título..."

                    style={{
                        width: "100%",
                        fontSize: 28,
                        fontWeight: 700,
                        background: "transparent",
                        border: "none",
                        color: "white",
                        outline: "none",
                        marginBottom: 20,
                    }}
                />

                <input
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="Área do conhecimento"

                    style={{
                        background: "#1f2937",
                        color: "#60a5fa",
                        border: "none",
                        borderRadius: 999,
                        padding: "8px 16px",
                        marginBottom: 25,
                        fontWeight: 600,
                        outline: "none",
                    }}
                />

                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}

                    style={{
                        width: "100%",
                        minHeight: 250,
                        resize: "vertical",
                    
                        background: "#0f172a",
                    
                        color: "white",
                    
                        border: "1px solid rgba(255,255,255,.08)",
                    
                        borderRadius: 14,
                    
                        padding: 18,
                    
                        outline: "none",
                    
                        fontSize: 16,
                    
                        lineHeight: 1.6,
                    
                        marginTop: 10,
                    
                        marginBottom: 25,
                    }}
                />

                <ConnectionsList
                    currentNeuron={{
                        ...neuron,
                        connections,
                    }}
                    neurons={neurons}
                    onToggleConnection={toggleConnection}
                />

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: 30,
                    }}
                >
                    <button
                    style={{
                    background: "#2563eb",
                    color: "white",
                    border: "none",
                    padding: "12px 22px",
                    borderRadius: 10,
                    cursor: "pointer",
                    fontWeight: 600,
                }}

                    onClick={() => {
                        if (!neuron) return;
                        onSave({                       
                            ...neuron,                        
                            title,                        
                            knowledgeArea: area,                        
                            content,
                            connections                    
                        });
                        onClose();
                    }}>
                    Salvar Alterações
                </button>

                <button
                style={{
                    background: "#2563eb",
                    color: "white",
                    border: "none",
                    padding: "12px 22px",
                    borderRadius: 10,
                    cursor: "pointer",
                    fontWeight: 600,
                }}
                >
                    Conectar neurônio
                </button>

                <button onClick={onClose}

                    style={{
                        background: "#374151",
                        color: "white",
                        border: "none",
                        padding: "12px 22px",
                        borderRadius: 10,
                        cursor: "pointer",
                    }}
                >
                    Fechar
                </button>

                <button
                    onClick={() => {
                        if (!neuron) return;
                        if (!confirm("Apagar este neurônio?")) return;
                        onDelete(neuron.id);
                        onClose();
                    }}
                
                    style={{
                        background: "#ff0000",
                        color: "white",
                        border: "none",
                        padding: "12px 18px",
                        borderRadius: 10,
                        cursor: "pointer",
                    }}
                >
                    Apagar neurônio
                </button>


                </div>

                
            </div>
        </div>
    );
}

export default MemoryModal;