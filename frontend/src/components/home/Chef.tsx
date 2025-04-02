import PrimaryButton from '../buttons/primary-button/PrimaryButton';
import chefImage from '../../assets/images/Chef-img.png';

const Chef = () => {
  return (
    <div className="w-[60%] flex flex-col md:flex-row items-center justify-center bg-white">
      <div className="md:w-1/2 flex justify-center">
        <img
          src={chefImage}
          alt="Chef talking about healthy food"
          className="w-64 h-auto rounded-lg"
        />
      </div>
      <div className="md:w-1/2 text-center md:text-left mt-6 md:mt-0">
        <h2 className="text-2xl font-bold text-gray-900 font-serif">
          Healthy Food for a Healthier Life
        </h2>
        <p className="mt-4 text-gray-600 text-xs">
          Our expert chefs craft dishes with fresh, wholesome ingredients to
          help you live a vibrant and healthy life.
        </p>
        <p className="mt-2 text-gray-600 text-xs">
          Enjoy delicious meals packed with essential nutrients, carefully
          designed to support your wellness journey.
        </p>
        <PrimaryButton
          onClickHandler={() => {}}
          label="Explore More"
          className="mt-6 bg-orange-500 text-white py-2 px-6 rounded-full shadow-md hover:bg-orange-600"
        />
      </div>
    </div>
  );
};

export default Chef;
