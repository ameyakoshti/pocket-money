import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { addSpend, getSpend, removeSpend, Spend } from "../../utils/spend";

interface ChildComponentProps {
  updateAmount: () => void;
}

const SpendList: React.FC<ChildComponentProps> = ({ updateAmount }) => {
  const [name, setName] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [savedData, setSavedData] = useState<Spend>({});

  useEffect(() => {
    setSavedData(getSpend().spendObject);
  }, []);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleAgeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name && value) {
      addSpend(name, value);
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
          className="w-full p-2 border border-gray-400 rounded bg-gray-900"
          placeholder="Spend"
        />
        <input
          type="number"
          value={value}
          onChange={handleAgeChange}
          className="w-full p-2 border border-gray-400 rounded bg-gray-900"
          placeholder="Amount"
        />
        <button
          type="submit"
          className={`bg-blue-500 text-white px-4 py-2 rounded ${
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
              {item[0]} - ${item[1]}
              <button
                onClick={() => handleRemoveItem(item[0])}
                className="ml-2 bg-red-500 text-white px-2 py-1 rounded float-right"
              >
                Remove
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SpendList;
