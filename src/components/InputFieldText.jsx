import React from "react";

const InputFieldText = ({
  id,
  placeholder,
  title,
  onChange,
  value,
  children,
}) => {
  return (
    <>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">{title}</label>
        <input
          type="text"
          id={id}
          name={id}
          className="border rounded w-full py-2 px-3 mb-2 leading-tight"
          placeholder={placeholder}
          onChange={onChange}
          required
          value={value}
        />
        {children}
      </div>
    </>
  );
};

export default InputFieldText;
