import React, { useState } from 'react';
import { Box } from 'lucide-react';
import { ImageUpload } from './components/ImageUpload';
import { Preview3D } from './components/Preview3D';

function App() {
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setImage(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Box className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">3D Image Converter</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transform your 2D images into stunning 3D models using advanced AI technology.
            Simply upload your image and watch the magic happen.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex flex-col items-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Upload Image</h2>
              <ImageUpload onImageUpload={handleImageUpload} />
              {image && (
                <div className="mt-8 w-full max-w-xl">
                  <img
                    src={image}
                    alt="Preview"
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col items-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">3D Preview</h2>
              {image ? (
                <Preview3D imageUrl={image} />
              ) : (
                <div className="w-full h-[400px] bg-gray-100 rounded-xl flex items-center justify-center">
                  <p className="text-gray-500">Upload an image to see the 3D preview</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500">
              Copyright © 2024 Team 3D-2D
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;