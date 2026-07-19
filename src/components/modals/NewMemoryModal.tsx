import { useState } from "react";
import "../../styles/modal.css";

type NewMemoryModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSave: (
        title: string,
        area: string,
        content: string
    ) => void;
};

function NewMemoryModal({
    isOpen,
    onClose,
    onSave
}: NewMemoryModalProps) {

    const [title, setTitle] = useState("");

    const [area, setArea] = useState("");

    const [content, setContent] = useState("");

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Nova Memória</h2>

                <input
                    placeholder="Título"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                            
                <input
                    placeholder="Área de conhecimento"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                />
                            
                <textarea
                    placeholder="Anotação"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <div className="modal-buttons">
                    <button
                        onClick={onClose}
                        className="btn-secondary">
                        Fechar
                    </button>

                    <button
                        onClick={() => {
                            onSave(title, area, content);
                            setTitle("");
                            setArea("");                    
                            setContent("");                   
                            onClose();
                        }}
                        className="btn-primary">
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NewMemoryModal;