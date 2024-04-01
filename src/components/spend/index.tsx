import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { addSpend, getSpend, removeSpend, Spend } from "../../utils/spend";

interface ChildComponentProps {
  updateAmount: () => void;
}

const SpendList: React.FC<ChildComponentProps> = ({ updateAmount }) => {
  const [name, setName] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [account, setAccount] = useState<string>("Checking");
  const [savedData, setSavedData] = useState<Spend>({});

  useEffect(() => {
    setSavedData(getSpend().spendObject);
  }, []);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleAccountChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setAccount(event.target.value);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name && value) {
      addSpend(name, value, account);
      setName("");
      setValue("");
      setSavedData(getSpend().spendObject);
      updateAmount();
    } else {
      alert("Please enter both name and value");
    }
  };

  const handleRemoveItem = (id: string) => {
    removeSpend(id);
    setSavedData(getSpend().spendObject);
    updateAmount();
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit} className="flex space-x-4 mb-4">
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          className="w-full p-2 border border-gray-400 rounded bg-gray-900 text-xs"
          placeholder="Spent on?"
        />
        <input
          type="number"
          value={value}
          onChange={handleValueChange}
          className="w-full p-2 border border-gray-400 rounded bg-gray-900 text-xs"
          placeholder="How much?"
        />
        <select
          value={account}
          onChange={handleAccountChange}
          className="w-full p-2 border border-gray-400 rounded bg-gray-900 text-xs"
        >
          <option value="Checkings">Checking</option>
          <option value="Savings">Saving</option>
          <option value="Donations">Donation</option>
        </select>
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
              <div className="grid grid-cols-2">
                <div>{item[0]}</div>
                <div className="flex justify-between">
                  <div>${item[1].value}</div>
                  <div>{item[1].account}</div>
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
  );
};

export default SpendList;
