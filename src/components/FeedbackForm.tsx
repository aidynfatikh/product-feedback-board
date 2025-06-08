import { useState } from "react";
import { useFeedbackStore } from "./types";
import FeedbackList from "./FeedbackList";

export default function FeedbackForm() {
    const addFeedback = useFeedbackStore((state) => state.addFeedback);
    const [selectedRating, setSelectedRating] = useState<number | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const feedback = formData.get("feedback") as string;

        if (!feedback.trim() || selectedRating === null) {
            alert("Please enter valid feedback and select a rating.");
            return;
        }

        const newFeedback = {
            id: Date.now(),
            feedback,
            rating: selectedRating,
            createdAt: new Date().toISOString(),
            likes: 0,
            isMine: true,
        };

        addFeedback(newFeedback);
        setSelectedRating(null);
        (e.target as HTMLFormElement).reset();
    };

    return (
        <div className="max-w-3xl mx-auto p-6 mt-10 bg-white rounded-xl shadow-lg">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">📝 Feedback Form</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="feedback" className="block text-gray-700 font-medium mb-1">
                        Your Feedback
                    </label>
                    <textarea
                        id="feedback"
                        name="feedback"
                        rows={4}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Write your thoughts here..."
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-1 text-center">Rating</label>
                    <div className="flex justify-center gap-2">
                        {[1, 2, 3, 4, 5].map((value) => (
                            <button
                                key={value}
                                type="button"
                                onClick={() => setSelectedRating(value)}
                                className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition ${
                                    selectedRating === value
                                        ? "bg-blue-600 text-white border-blue-600"
                                        : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
                                }`}
                                aria-label={`Rate ${value}`}
                            >
                                {value}
                            </button>
                        ))}
                    </div>
                </div>


                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Submit
                    </button>
                </div>
            </form>

            <div className="mt-10">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">📋 Submitted Feedback</h2>
                <FeedbackList />
            </div>
        </div>
    );
}
