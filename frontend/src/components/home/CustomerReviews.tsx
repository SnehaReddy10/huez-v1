import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import PrimaryButton from '../buttons/primary-button/PrimaryButton';
import { reviews } from '../../static';

export default function CustomerReviews() {
  const [index, setIndex] = useState(0);

  const nextReview = () => {
    setIndex((prevIndex) => (prevIndex + 2) % reviews.length);
  };

  const prevReview = () => {
    setIndex((prevIndex) => (prevIndex - 2 + reviews.length) % reviews.length);
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <h2 className="text-2xl font-semibold">Customer Reviews</h2>
      <p className="text-gray-500 text-xs">
        See what our customers are saying about our food delivery service.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[index, (index + 1) % reviews.length].map((i) => (
          <div
            key={i}
            className="w-80 p-4 flex gap-4 border-[1px] border-gray-200 bg-white rounded-sm text-center"
          >
            <img
              src={reviews[i].image}
              alt={reviews[i].name}
              className="w-32 h-40 mx-auto border-2 border-gray-300 mb-4"
            />
            <div className="flex flex-col text-start gap-2">
              <h3 className="text-lg font-semibold">{reviews[i].name}</h3>
              <p className="text-sm text-gray-500">{reviews[i].role}</p>
              <p className="text-gray-400 text-xs font-normal">
                "{reviews[i].review}"
              </p>
              <div className="flex justify-start">
                {[...Array(reviews[i].rating)].map((_, j) => (
                  <FaStar
                    key={j}
                    size={16}
                    className="text-yellow-500"
                    fill="gold"
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <PrimaryButton onClickHandler={prevReview} label="Previous" />
        <PrimaryButton onClickHandler={nextReview} label="Next" />
      </div>

      <div className="w-80 h-[2px] bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-[2px] bg-blue-500 transition-all"
          style={{ width: `${((index + 2) / reviews.length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}
