import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type FeedbackItem = {
    id: number;
    feedback: string;
    rating: number;
    createdAt: string;
    likes: number;
};

type FeedbackStore = {
    feedbacks: FeedbackItem[];
    likedIds: number[]; 
    addFeedback: (feedback: FeedbackItem) => void;
    likeFeedback: (id: number) => void;
    deleteFeedback: (id: number) => void;
};

export const useFeedbackStore = create<FeedbackStore>()(
    persist(
        (set, get) => ({
            feedbacks: [],
            likedIds: [],
            dislikedIds: [],
            addFeedback: (feedback) =>
                set((state) => ({ feedbacks: [...state.feedbacks, feedback] })),

            likeFeedback: (id) => {
                const { likedIds, feedbacks } = get();
                if (likedIds.includes(id)) {
                    set({
                        feedbacks: feedbacks.map((item) =>
                            item.id === id ? { ...item, likes: item.likes - 1 } : item
                        ),
                        likedIds: likedIds.filter((item) => item !== id),
                    });

                    return;
                } // already liked

                set({
                    feedbacks: feedbacks.map((item) =>
                        item.id === id ? { ...item, likes: item.likes + 1 } : item
                    ),
                    likedIds: [...likedIds, id],
                });
            },
            deleteFeedback: (id) => {
                set((state) => ({
                    feedbacks: state.feedbacks.filter((item) => item.id !== id),
                    likedIds: state.likedIds.filter((likedId) => likedId !== id),
                }))
            },
        }),
        
        {
            name: 'feedback-storage',
        }
    )
);
