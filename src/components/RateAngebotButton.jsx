import React from "react";
import { Link } from "react-router-dom";

const GrayButton = ({ id, children }) => {
  return (
    <div className="mt-3">
      <div className="rounded-md shadow">
        <Link
          to={`/tarif/${id}`}
          className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 dark:bg-gray-700 hover:bg-gray-900 dark:hover:bg-gray-600"
        >
          {children}
        </Link>
      </div>
    </div>
  );
};

export default GrayButton;
