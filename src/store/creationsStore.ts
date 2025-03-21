import { create } from 'zustand';

type Creation = {
  id: string;
  title: string;
};

type CreationsStore = {
  creations: Creation[];
  fetchCreations: () => Promise<void>;
  createCreation: (title: string) => Promise<Creation>;
};

export const useCreationsStore = create<CreationsStore>((set) => ({
  creations: [],

  fetchCreations: async () => {
    try {
      const data = [
        { id: '1', title: 'my first little creation' },
        { id: '2', title: 'another cool project' },
        { id: '3', title: 'awesome AI experiment' },
      ];

      set({ creations: data });
    } catch (error) {
      console.error('Error fetching creations:', error);
    }
  },

  createCreation: async (title: string) => {
    try {
      const response = await fetch('/api/creations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });

      const newCreation = await response.json();

      set((state) => ({
        creations: [...state.creations, newCreation],
      }));

      return newCreation;
    } catch (error) {
      console.error('Error creating creation:', error);
      throw error;
    }
  },
}));
