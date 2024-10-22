import React from "react";

const InputFieldSelect = ({ id, options, title, onChange, value }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">{title}</label>
      <select
        id={id}
        name={id}
        className="border rounded py-2 px-3"
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};

export default InputFieldSelect;
