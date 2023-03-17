import React from "react";
import { useParams } from "react-router-dom";

export default function Assert() {
  let { assertId } = useParams();


  return (
    <div className="container p-2 flex justify-center">
      <div className="card w-3/4 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-center justify-center">Assert: {assertId}</h2>
        </div>
      </div>
    </div>
  );
};