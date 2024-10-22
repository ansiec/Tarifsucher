import React from "react";
import Spinner from "./Spinner";
import RateListing from "./RateListing";

const RateListings = ({ loading, showListings, result }) => {
  return (
    <section className="bg-gray-100 dark:bg-gray-700 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          showListings && (
            <div className="grid grid-cols-1 md:grid-cols-1 gap-0">
              {result.map((rate, index) => {
                return <RateListing id={index} rate={rate}></RateListing>;
              })}
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default RateListings;
