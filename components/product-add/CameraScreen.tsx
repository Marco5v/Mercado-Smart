import React, { useRef, useEffect, useState } from 'react';
import XMarkIcon from '../icons/XMarkIcon';

interface CameraScreenProps {
  onPhotoTaken: (dataUrl: string) => void;
  onManualEntry: () => void;
  onClose: () => void;
}

const CameraScreen: React.FC<CameraScreenProps> = ({ onPhotoTaken, onManualEntry, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;
    const startCamera = async () => {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' },
          });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } else {
            setError("Seu navegador não suporta acesso à câmera.");
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setError("Não foi possível acessar a câmera. Verifique as permissões.");
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);
  
  const handleTakePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const dataUrl = canvas.toDataURL('image/jpeg');
        // remove "data:image/jpeg;base64," prefix
        onPhotoTaken(dataUrl.split(',')[1]); 
      }
    }
  };

  return (
    <div className="relative w-full h-full bg-black">
      <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover"></video>
      <canvas ref={canvasRef} className="hidden"></canvas>
      
      {/* Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md h-48 border-4 border-white border-dashed rounded-lg" style={{ background: 'rgba(255, 255, 255, 0.1)' }}></div>
        <p className="text-white text-center mt-4 font-semibold">Posicione o produto na área demarcada</p>
      </div>

      {error && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white p-4 rounded-lg">
          {error}
        </div>
      )}

      {/* Controls */}
      <button onClick={onClose} className="absolute top-4 right-4 bg-black/50 p-2 rounded-full text-white">
        <XMarkIcon className="w-6 h-6" />
      </button>

      <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={handleTakePhoto}
            className="bg-amber-600 text-white font-bold py-3 px-10 rounded-full shadow-lg text-lg"
          >
            Tirar Foto
          </button>
          <button
            onClick={onManualEntry}
            className="text-white font-semibold"
          >
            Digitar Manualmente
          </button>
        </div>
      </div>
    </div>
  );
};

export default CameraScreen;
