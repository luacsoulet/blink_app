import { X } from "lucide-react";

type ModifyModalProps = {
    content?: string,
    username?: string,
    email?: string,
    description?: string,
    type: "user" | "post",
    isModifying: boolean,
    setContent?: (content: string) => void,
    setUsername?: (username: string) => void,
    setEmail?: (email: string) => void,
    setDescription?: (description: string) => void,
    onClose: () => void,
    onModify: () => void
}

export const ModifyModal = ({
    type,
    isModifying,
    content = "",
    username = "",
    email = "",
    description = "",
    setContent,
    setUsername,
    setEmail,
    setDescription,
    onClose,
    onModify
}: ModifyModalProps) => {

    return (
        <div className="fixed inset-0 bg-primary/10 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="relative bg-tertiary p-4 rounded-lg w-full max-w-2xl py-8 px-24 flex flex-col gap-4">
                <h1 className="text-2xl font-bold text-center">
                    {type === "post" ? "Modify post" : "Modify profile"}
                </h1>
                <button
                    className="absolute top-2 right-2 w-fit h-fit bg-delete text-secondary px-2 py-2 rounded-lg hover:bg-delete/80 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                    onClick={onClose}
                >
                    <X />
                </button>
                <div className="flex flex-col gap-4 w-full">
                    {type === "post" ? (
                        <textarea
                            placeholder="Content"
                            className="w-full p-2 rounded-lg border border-secondary bg-secondary/10 min-h-[150px] resize-none"
                            value={content}
                            onChange={(e) => setContent && setContent(e.target.value)}
                        />
                    ) : (
                        <div className="flex flex-col gap-4">
                            <input
                                type="text"
                                placeholder="Username"
                                className="w-full p-2 rounded-lg border border-secondary bg-secondary/10"
                                value={username}
                                onChange={(e) => setUsername && setUsername(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Email"
                                className="w-full p-2 rounded-lg border border-secondary bg-secondary/10"
                                value={email}
                                onChange={(e) => setEmail && setEmail(e.target.value)}
                            />
                            <textarea
                                placeholder="Description"
                                className="w-full p-2 rounded-lg border border-secondary bg-secondary/10 min-h-[150px] resize-none"
                                value={description}
                                onChange={(e) => setDescription && setDescription(e.target.value)}
                            />
                        </div>
                    )}
                    <div className="flex gap-4 justify-center">
                        <button
                            className="bg-secondary/20 text-secondary px-4 py-2 rounded-lg hover:bg-secondary/10 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            className="bg-action text-primary px-4 py-2 rounded-lg hover:bg-action/80 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                            onClick={onModify}
                            disabled={isModifying}
                        >
                            {isModifying ? "Modification..." : "Modify"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}