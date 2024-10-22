import React from "react";

const ListItemIncluded = ({ children, id }) => {
  return (
    <li id={id} className="flex items-start lg:col-span-1">
      <div className="flex-shrink-0">
        <svg
          className="h-5 w-5 text-green-400 dark:text-green-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
      <p className="ml-3 text-sm text-gray-700 dark:text-gray-300">
        {children}
      </p>
    </li>
  );
};

export default ListItemIncluded;
