'use client'
import React, { createContext, useState, useContext, ReactNode, ReactElement } from 'react';

interface ImageContextType {
  image: string | null;
  setImage: (newImage: string) => void;
  clearImage: () => void;
}


const ImageContext = createContext<ImageContextType | undefined>(undefined);


export const useImageContext = (): ImageContextType => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error('useImageContext must be used within an ImageProvider');
  }
  return context;
};


interface ImageProviderProps {
  children: ReactNode;
}


export const ImageProvider = ({ children }: ImageProviderProps): ReactElement => {
  const [image, setImage] = useState<string | null>(null);

  const clearImage = () => setImage(null);

  return (
    <ImageContext.Provider value={{ image, setImage, clearImage }}>
      {children}
    </ImageContext.Provider>
  );
};
