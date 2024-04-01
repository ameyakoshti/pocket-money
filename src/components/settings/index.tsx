"use client";

import React, { useState, useEffect } from "react";

interface ChildComponentProps {
  updateAmount: () => void;
}

interface InputValues {
  checking: string;
  saving: string;
  donation: string;
}

const Settings: React.FC<ChildComponentProps> = ({ updateAmount }) => {
  const [showModal, setShowModal] = useState(false);
  const [inputValues, setInputValues] = useState<InputValues>({
    checking: localStorage.getItem("Checking") || "3",
    saving: localStorage.getItem("Saving") || "1",
    donation: localStorage.getItem("Donation") || "1",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleSave = (): void => {
    localStorage.setItem("Checking", inputValues.checking);
    localStorage.setItem("Saving", inputValues.saving);
    localStorage.setItem("Donation", inputValues.donation);
    updateAmount();
    setShowModal(false);
  };

  const handleCancel = (): void => {
    setShowModal(false);
  };

  return (
    <>
      <button onClick={() => setShowModal(true)}>
        <svg
          fill="#FFFFFF"
          width="32px"
          height="32px"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          data-name="Layer 1"
        >
          <path d="M19.9,12.66a1,1,0,0,1,0-1.32L21.18,9.9a1,1,0,0,0,.12-1.17l-2-3.46a1,1,0,0,0-1.07-.48l-1.88.38a1,1,0,0,1-1.15-.66l-.61-1.83A1,1,0,0,0,13.64,2h-4a1,1,0,0,0-1,.68L8.08,4.51a1,1,0,0,1-1.15.66L5,4.79A1,1,0,0,0,4,5.27L2,8.73A1,1,0,0,0,2.1,9.9l1.27,1.44a1,1,0,0,1,0,1.32L2.1,14.1A1,1,0,0,0,2,15.27l2,3.46a1,1,0,0,0,1.07.48l1.88-.38a1,1,0,0,1,1.15.66l.61,1.83a1,1,0,0,0,1,.68h4a1,1,0,0,0,.95-.68l.61-1.83a1,1,0,0,1,1.15-.66l1.88.38a1,1,0,0,0,1.07-.48l2-3.46a1,1,0,0,0-.12-1.17ZM18.41,14l.8.9-1.28,2.22-1.18-.24a3,3,0,0,0-3.45,2L12.92,20H10.36L10,18.86a3,3,0,0,0-3.45-2l-1.18.24L4.07,14.89l.8-.9a3,3,0,0,0,0-4l-.8-.9L5.35,6.89l1.18.24a3,3,0,0,0,3.45-2L10.36,4h2.56l.38,1.14a3,3,0,0,0,3.45,2l1.18-.24,1.28,2.22-.8.9A3,3,0,0,0,18.41,14ZM11.64,8a4,4,0,1,0,4,4A4,4,0,0,0,11.64,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,11.64,14Z" />
        </svg>
      </button>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-lg font-semibold mb-4 text-black">
              Set category contributions
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block mb-1 text-black">
                  Spending account
                </label>
                <input
                  type="number"
                  name="spending"
                  value={inputValues.checking}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2 text-black"
                />
              </div>
              <div>
                <label className="block mb-1 text-black">Saving account</label>
                <input
                  type="number"
                  name="saving"
                  value={inputValues.saving}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2 text-black"
                />
              </div>
              <div>
                <label className="block mb-1 text-black">Donations</label>
                <input
                  type="number"
                  name="donation"
                  value={inputValues.donation}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2 text-black"
                />
              </div>
            </div>
            <div className="mt-5 flex justify-end">
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 mr-2 rounded hover:bg-blue-600"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
