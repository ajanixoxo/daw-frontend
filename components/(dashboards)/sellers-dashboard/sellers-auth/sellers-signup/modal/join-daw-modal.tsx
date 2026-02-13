'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface DAWModalProps {
  isOpen: boolean;
  onClose: () => void;
  dismissLabel?: string;
  isAlreadySeller?: boolean;
}

export default function DAWModal({ isOpen, onClose, dismissLabel = "Maybe Later", isAlreadySeller = false }: DAWModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleJoinDAW = () => {
    router.push('/cooperative/cooperative-signup');
    onClose();
  };

  return (
    <>
      {/* Backdrop — no dismiss on click for existing sellers */}
      <div
        className="fixed inset-0 bg-transparent backdrop-blur-sm bg-opacity-50 z-40 transition-opacity"
        onClick={isAlreadySeller ? undefined : onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="relative w-full max-w-md transform transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="rounded-2xl shadow-2xl overflow-hidden">
            {/* Header Section */}
            <div style={{ backgroundColor: '#f10e7c' }} className="px-8 py-10 text-white">
              <h2 className="text-3xl font-bold mb-3">
                {isAlreadySeller ? "You're Already a Seller!" : "Join DAW Today!"}
              </h2>
              <p className="text-lg opacity-95">
                {isAlreadySeller
                  ? "Your account already has a seller profile and shop. Join the DAW cooperative to unlock even more benefits."
                  : "Unlock exclusive offers and benefits reserved just for our DAW members."}
              </p>
            </div>

            {/* Content Section */}
            <div className="bg-white px-8 py-8">
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span style={{ color: '#f10e7c' }} className="mr-3 text-xl font-bold">✓</span>
                  <span className="text-gray-700">Exclusive member-only deals</span>
                </li>
                <li className="flex items-start">
                  <span style={{ color: '#f10e7c' }} className="mr-3 text-xl font-bold">✓</span>
                  <span className="text-gray-700">Early access to new features</span>
                </li>
                <li className="flex items-start">
                  <span style={{ color: '#f10e7c' }} className="mr-3 text-xl font-bold">✓</span>
                  <span className="text-gray-700">Priority customer support</span>
                </li>
              </ul>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleJoinDAW}
                  style={{ backgroundColor: '#f10e7c' }}
                  className="w-full text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity duration-200"
                >
                  Join DAW
                </button>

                {isAlreadySeller ? (
                  <div className="flex gap-3">
                    <button
                      onClick={() => router.push('/sellers/dashboard')}
                      className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                    >
                      My Dashboard
                    </button>
                    <button
                      onClick={() => router.push('/')}
                      className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                    >
                      Homepage
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={onClose}
                    className="w-full bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                  >
                    {dismissLabel}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}