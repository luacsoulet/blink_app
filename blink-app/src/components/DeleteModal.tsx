"use client";

interface DeleteModalProps {
    message: string;
    isDeleting: boolean;
    onClose: () => void;
    onDelete: () => void;
}

export const DeleteModal = ({ message, isDeleting, onClose, onDelete }: DeleteModalProps) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-quaternary p-6 rounded-lg flex flex-col gap-4 border-2 border-quinary max-w-md w-full mx-4">
                <h2 className="text-xl font-bold text-secondary">Confirm Deletion</h2>
                <p className="text-secondary">{message} <br />This action cannot be undone.</p>
                <div className="flex justify-end gap-4">
                    <button
                        className="px-4 py-2 rounded-lg hover:bg-secondary/30 transition-all duration-300 text-secondary hover:scale-105 active:scale-95"
                        onClick={onClose}
                        disabled={isDeleting}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-500/80 transition-all duration-300 text-primary hover:scale-105 active:scale-95"
                        onClick={onDelete}
                        disabled={isDeleting}
                    >
                        {isDeleting ? "Deleting..." : "Confirm Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
} 