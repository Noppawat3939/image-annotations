import { type ChangeEvent, useRef, useState } from "react";

const useHandleUploadImage = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [selectedImage, setSelectedImage] = useState<File | null>();

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (files && files.length > 0) {
      setSelectedImage(files[0]);
    }
  };

  const handleChooseImage = () => inputRef?.current?.click();

  return {
    ref: { inputRef },
    state: { selectedImage },
    action: { handleImageChange, handleChooseImage },
  };
};

export default useHandleUploadImage;
