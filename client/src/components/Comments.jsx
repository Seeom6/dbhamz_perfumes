import React from "react";
import { customer } from "../utils/data.jsx";

const Comments = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {customer.map((item , idx) => (
          <div
            key={idx}
            className="border border-primary rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-4"
          >
            <div className="w-full flex  items-center gap-3">
              <img
                src={item.profile}
                alt={item.name}
                className="w-11  h-11 object-cover rounded-full"
              />
              <p> {item.name} </p>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-regular text-ford">{item.comment}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
