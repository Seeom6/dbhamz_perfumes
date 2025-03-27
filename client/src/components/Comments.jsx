import React from "react";
import { customer } from "../utils/data.jsx";
import { FaUserCircle, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { motion } from "framer-motion";

const Comments = () => {
  return (
    <div className="w-full py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-primary relative">
          <span className="relative inline-block">
            آراء عملائنا
            <span className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></span>
          </span>
        </h2>
      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {customer.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative h-full bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 overflow-hidden">
                <div className="p-6 h-full flex flex-col">
                  {/* Quote marks */}
                  <FaQuoteLeft className="text-gray-200 text-3xl absolute top-4 left-4" />
                  <FaQuoteRight className="text-gray-200 text-3xl absolute bottom-4 right-4" />
                  
                  {/* Rating */}
                  <div className="flex justify-end text-yellow-400 text-lg mb-4">
                    {item.rating}
                  </div>
                  
                  {/* Comment */}
                  <p className="text-gray-700 text-right mb-6 leading-relaxed text-lg flex-grow relative z-10">
                    {item.comment}
                  </p>
                  
                  {/* User Info */}
                  <div className="flex items-center justify-end mt-auto">
                    <div className="text-right mr-4">
                      <p className="font-bold text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500 flex items-center justify-end">
                        <span className="ml-1">{item.date}</span>
                      </p>
                    </div>
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary p-0.5">
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                        <FaUserCircle className="text-primary" size={28} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comments;