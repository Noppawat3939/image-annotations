import { useImageStore } from "@/store";
import { type ChangeEvent, useRef } from "react";

const useHandleUploadImage = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { setImageFile, imageFile, imageUrl } = useImageStore((store) => ({
    setImageFile: store.setImageFile,
    imageFile: store.imageFile,
    imageUrl: store.imageUrl,
  }));

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (files && files.length > 0) {
      setImageFile(files[0]);
    }
  };

  const handleChooseImage = () => inputRef?.current?.click();

  const renderSelectedImage = () => {
    if (imageFile) return URL.createObjectURL(imageFile);

    return imageUrl;
  };

  return {
    ref: { inputRef },
    state: { selectedImage: renderSelectedImage() },
    action: { handleImageChange, handleChooseImage },
  };
};

export default useHandleUploadImage;
