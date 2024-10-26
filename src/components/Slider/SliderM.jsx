import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import image1 from '../../assets/Mercury/mc11.jpg';
import image2 from '../../assets/Mercury/mc22.jpg';

const products = [
  {
    id: "mercury-planter",
    heading: "MERCURY PLANTER",
    image: image1,
    price: "99.99",
  },
  {
    id: "mercury-cone",
    heading: "MERCURY CONE",
    image: image2,
    price: "99.99",
  }
];

const InfinitySlider = ({ products }) => {
  const navigate = useNavigate();
  const controls = useAnimation();
  const [isPaused, setIsPaused] = useState(false);

  // Handle click event to navigate to product pages
  const handleClick = (id) => {
    navigate(`/mercuryCollection/${id}`);
  };

  // Infinite loop animation for the slider
  const startAnimation = () => {
    controls.start({
      x: ['0%', '-100%'],
      transition: {
        duration: 10, // Control the speed of the loop
        ease: 'linear',
        repeat: Infinity,
      },
    });
  };

  const pauseAnimation = () => {
    controls.stop();
  };

  // Start the animation on component mount
  useEffect(() => {
    if (!isPaused) startAnimation();
    // Stop animation if paused
    if (isPaused) pauseAnimation();
  }, [isPaused, controls]);

  return (
    <div className="w-full overflow-hidden relative">
      {/* Heading */}
      <h2 className="text-6xl font-montserrat font-semibold mt-10 text-center mb-4 ">
        MERCURY COLLECTION
      </h2>
      <motion.div
        className="flex items-center space-x-6"
        animate={controls}
        drag="x" // Allow dragging on the x-axis
        dragConstraints={{ left: -1000, right: 0 }} // Set drag limits
        dragElastic={0.05} // Adds smooth drag effect
        onDragStart={() => {
          setIsPaused(true); // Pause automatic sliding when dragging starts
        }}
        onDragEnd={() => {
          setIsPaused(false); // Resume automatic sliding after dragging ends
        }}
        onMouseEnter={() => {
          setIsPaused(true);
          pauseAnimation();
        }}
        onMouseLeave={() => {
          setIsPaused(false);
          startAnimation();
        }}
      >
        {/* Repeat products infinitely */}
        {[...products, ...products, ...products, ...products, ...products].map((product, index) => (
          <motion.div
            key={index}
            className="relative group cursor-pointer flex-shrink-0"
            onClick={() => handleClick(product.id)}
            whileHover={{ scale: 1.05 }}
          >
            {/* Image */}
            <img
              src={product.image}
              alt={`slider-img-${index}`}
              className="w-96 h-120 object-cover rounded-lg"
            />
            {/* Checkout button (appears on hover) */}
            <motion.button
              className="absolute inset-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white font-semibold text-lg transition-opacity duration-300"
              whileHover={{ opacity: 1 }}
              onClick={(e) => {
                e.stopPropagation();
                handleClick(product.id);
              }}
            >
              View Product
            </motion.button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

const SliderM = () => {
  return (
    <div className="bg-gray-100 min-h-5/6 flex items-center justify-center p-4">
      <InfinitySlider products={products} />
    </div>
  );
};

export default SliderM;
