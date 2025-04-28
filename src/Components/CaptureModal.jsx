import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Camera } from "lucide-react"; // Ton icône

function CaptureModal({ videoEnabled, capture }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {videoEnabled && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white p-4  hover:bg-blue-700 transition-colors duration-300"
          aria-label="Open capture modal"
        >
          <Camera size={24} />
        </button>
      )}

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white  p-6 space-y-4 shadow-xl max-w-sm w-full">
            <Dialog.Title className="text-lg font-bold text-gray-800">
              📸 Capturer une image
            </Dialog.Title>
            <p className="text-gray-600">Voulez-vous prendre un snapshot de la vidéo en cours ?</p>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-300  hover:bg-gray-400 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  capture();
                  setIsOpen(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white  hover:bg-blue-700 transition-colors"
              >
                Capturer
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}

export default CaptureModal;
