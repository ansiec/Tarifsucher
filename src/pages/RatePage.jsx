import React from "react";
import { useParams } from "react-router-dom";

const RatePage = ({}) => {
  const { id } = useParams();
  return (
    <section>
      <div className="text-center mt-28 font-medium">
        {"Tarifseite für rateId " + id}
      </div>
    </section>
  );
};

export default RatePage;
