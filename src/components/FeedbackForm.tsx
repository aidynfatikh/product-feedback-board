import { useState } from "react";
import type { FeedbackItem } from "./types";
import FeedbackList from "./FeedbackList";

export default function FeedbackForm() {
    const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const feedback = formData.get("feedback") as string;
        const rating = Number(formData.get("rating"));

        if (!feedback.trim() || isNaN(rating) || rating < 1 || rating > 5) {
            alert("Please enter valid feedback and a rating between 1 and 5.");
            return;
        }

        const newFeedback: FeedbackItem = {
            id: feedbacks.length + 1,
            feedback,
            rating,
            createdAt: new Date().toISOString(),
        };

        setFeedbacks([...feedbacks, newFeedback]);
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
                    <label htmlFor="rating" className="block text-gray-700 font-medium mb-1">
                        Rating (1–5)
                    </label>
                    <input
                        type="number"
                        id="rating"
                        name="rating"
                        min={1}
                        max={5}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Rate from 1 to 5"
                    />
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
                <FeedbackList feedbackItems={feedbacks} />
            </div>
        </div>
    );
}
