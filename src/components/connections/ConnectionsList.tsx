import { useState } from "react";
import type { Neuron } from "../../types/Neuron";
import "../../styles/ConnectionsList.css";

type ConnectionsListProps = {
    currentNeuron: Neuron;
    neurons: Neuron[];
    onToggleConnection: (id: number) => void;
};

function ConnectionsList({
    currentNeuron,
    neurons,
    onToggleConnection,
}: ConnectionsListProps) {

    const [search, setSearch] = useState("");

    return (
        <div>

            <h3>Conexões</h3>

            <input
                className="connections-search"
                type="text"
                placeholder="🔍 Buscar conexão..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {neurons
                .filter((n) => n.id !== currentNeuron.id)
                .filter((n) =>
                    n.title
                        .toLowerCase()
                        .includes(search.toLowerCase())
                )
                .map((n) => {

                    const connected =
                        currentNeuron.connections.includes(n.id);

                    return (

                        <label
                            key={n.id}
                            className="connection-item"
                        >

                            <input
                                type="checkbox"
                                checked={connected}
                                onChange={() =>
                                    onToggleConnection(n.id)
                                }
                            />

                            <span>{n.title}</span>

                        </label>

                    );

                })}

        </div>
    );

}

export default ConnectionsList;