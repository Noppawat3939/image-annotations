import { create } from "zustand";

type ImageStore = {
  imageFile: File | null;
  setImageFile: (image: File) => void;
  imageUrl: string | null;
  setImageUrl: (image: string | null) => void;
};

const useImageStore = create<ImageStore>((set) => ({
  imageFile: null,
  imageUrl: null,
  setImageFile: (newImageFile) => set(() => ({ imageFile: newImageFile })),
  setImageUrl: (imageUrl) => set(() => ({ imageUrl })),
}));

export default useImageStore;
