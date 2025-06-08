import { useFeedbackStore } from "./types";
import { X } from "lucide-react"; // You can install lucide-react or use any icon library

export default function FeedbackList() {
    const feedbackItems = useFeedbackStore((state) => state.feedbacks);
    const likeFeedback = useFeedbackStore((state) => state.likeFeedback);
    const deleteFeedback = useFeedbackStore((state) => state.deleteFeedback); // You’ll define this

    if (feedbackItems.length === 0) {
        return <p className="text-gray-500 italic text-center mt-6">No feedback submitted yet.</p>;
    }

    return (
        <ul className="space-y-6">
            {feedbackItems.map((item) => (
                <li
                    key={item.id}
                    className="relative p-5 border border-gray-200 rounded-xl bg-white shadow hover:shadow-md transition duration-200"
                >
                    {/* Delete button */}
                    <button
                        onClick={() => deleteFeedback(item.id)}
                        className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
                        aria-label="Delete"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <p className="text-lg text-gray-800 font-semibold">{item.feedback}</p>
                    <p className="text-sm text-gray-600 mt-1">
                        ⭐ Rating: <span className="font-medium">{item.rating}/5</span> —{" "}
                        {new Date(item.createdAt).toLocaleString()}
                    </p>

                    <div className="flex items-center justify-between mt-4">
                        <span className="text-sm text-gray-700">👍 {item.likes} Likes</span>
                        <button
                            onClick={() => likeFeedback(item.id)}
                            className="px-4 py-1 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition"
                        >
                            Like
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
}
