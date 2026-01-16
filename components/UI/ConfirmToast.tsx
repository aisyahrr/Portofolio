import toast from "react-hot-toast";

type ConfirmToastProps = {
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: "danger" | "success" | "info";
    onConfirm: () => Promise<void> | void;
};

export function confirmToast({
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    variant = "info",
    onConfirm,
}: ConfirmToastProps) {
    toast(
        (t) => (
        <div className="text-sm bg-black border border-blue-400 rounded-lg text-white p-4
                    shadow-lg max-w-sm  ">
            <h4 className="font-semibold mb-1">{title}</h4>
            <p className="text-white/60 mb-4">{message}</p>

            <div className="flex justify-end gap-2">
            <button
                onClick={() => toast.dismiss(t.id)}
                className="px-3 py-1 rounded border border-white/20
                        text-white/70 hover:bg-white/10 transition"
            >
                {cancelText}
            </button>

            <button
                onClick={async () => {
                await onConfirm();
                toast.dismiss(t.id);
                }}
                className={`px-3 py-1 rounded border transition
                ${
                    variant === "danger"
                    ? "border-red-400/30 text-red-400 hover:bg-red-500/10"
                    : "border-green-400/30 text-green-400 hover:bg-green-500/10"
                }
                `}
            >
                {confirmText}
            </button>
            </div>
        </div>
        ),
        { duration: Infinity }
    );
}
