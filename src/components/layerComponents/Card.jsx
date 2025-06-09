// src/components/layerComponents/Card.js
import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, title, className, animationVariants }) => {
  return (
    <motion.div
      className={`bg-white rounded-lg shadow-md p-6 mb-6 ${className || ''}`}
      variants={animationVariants} // Receives the cardVariants from Dashboard
      initial="hidden"             // Sets initial state
      animate="visible"            // Animates to visible state
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }} // Good transition for hover
    >
      {title && <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>}
      <div>{children}</div>
    </motion.div>
  );
};

export default Card;