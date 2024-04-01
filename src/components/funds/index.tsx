import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { addFunds, getFunds, removeFunds, Fund } from "../../utils/spend";

interface ChildComponentProps {
  updateAmount: () => void;
  account: string;
}

const Funds: React.FC<ChildComponentProps> = ({ updateAmount, account }) => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [savedData, setSavedData] = useState<Fund>({});

  useEffect(() => {
    setSavedData(getFunds(account));
  }, []);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name && value) {
      addFunds(name, value, account);
      setName("");
      setValue("");
      setSavedData(getFunds(account));
      updateAmount();
    } else {
      alert("Please enter both name and value");
    }
  };

  const handleRemoveItem = (id: string) => {
    removeFunds(id, account);
    setSavedData(getFunds(account));
    updateAmount();
  };

  const handleDone = (): void => {
    setShowModal(false);
  };

  return (
    <>
      <button onClick={() => setShowModal(true)}>
        <svg
          fill="#FFFFFF"
          width="16px"
          height="16px"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M512 0C229.232 0 0 229.232 0 512c0 282.784 229.232 512 512 512 282.784 0 512-229.216 512-512C1024 229.232 794.784 0 512 0zm0 961.008c-247.024 0-448-201.984-448-449.01 0-247.024 200.976-448 448-448s448 200.977 448 448-200.976 449.01-448 449.01zM736 480H544V288c0-17.664-14.336-32-32-32s-32 14.336-32 32v192H288c-17.664 0-32 14.336-32 32s14.336 32 32 32h192v192c0 17.664 14.336 32 32 32s32-14.336 32-32V544h192c17.664 0 32-14.336 32-32s-14.336-32-32-32z" />
        </svg>
      </button>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-8 m-8 rounded-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold mb-4 text-black">
                Add funds to {account} account
              </h2>
              <div className="mr-[-20px] mt-[-50px]">
                <button onClick={handleDone}>
                  <svg
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 20L4 4.00003M20 4L4.00002 20"
                      stroke="#000000"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="mb-5">
              <form onSubmit={handleFormSubmit} className="flex space-x-4 mb-4">
                <input
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  className="w-full p-2 border border-gray-400 rounded text-black text-xs"
                  placeholder="For?"
                />
                <input
                  type="number"
                  value={value}
                  onChange={handleValueChange}
                  className="w-full p-2 border border-gray-400 rounded text-black text-xs"
                  placeholder="How much?"
                />
                <button
                  type="submit"
                  className={`bg-blue-500 text-white px-4 rounded ${
                    !(name && value) && "opacity-50 cursor-not-allowed"
                  }`}
                  disabled={!name || !value}
                >
                  Add
                </button>
              </form>
              <ul>
                {Object.keys(savedData).length !== 0 &&
                  Object.entries(savedData).map((item, index) => (
                    <li key={index} className="w-full pt-2 pb-2 pl-2">
                      <div className="grid grid-cols-2 text-black">
                        <div>{item[0]}</div>
                        <div className="flex justify-between">
                          <div>${item[1]}</div>
                          <button
                            onClick={() => handleRemoveItem(item[0])}
                            className="ml-2 bg-red-500 text-white px-2 py-1 rounded h-8"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Funds;
