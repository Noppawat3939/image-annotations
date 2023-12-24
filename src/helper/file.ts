export const getBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      return resolve(reader.result as string);
    };

    reader.onerror = (error) => {
      reject(error);
    };
  });
