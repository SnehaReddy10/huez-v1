import { LiaShippingFastSolid } from 'react-icons/lia';
import PrimaryButton from './buttons/PrimaryButton';

function New() {
  return (
    <div>
      {/* mobile hero */}
      <div className="bg-black-900 min-h-screen p-4 flex flex-col gap-2 justify-between py-8">
        <div className="flex flex-col gap-4 items-end">
          <img
            src="https://cdn.pixabay.com/photo/2016/03/06/20/29/noodles-1241187_1280.jpg"
            alt=""
            className="rounded-full h-32 w-32"
          />
          <img
            src="https://cdn.pixabay.com/photo/2016/11/18/19/00/bread-1836411_1280.jpg"
            alt=""
            className="rounded-full h-32 w-32"
          />
          <img
            src="https://cdn.pixabay.com/photo/2018/09/14/11/00/food-3676769_1280.jpg"
            alt=""
            className="rounded-full h-32 w-32"
          />
        </div>
        <div className="text-white flex flex-col justify-start">
          <h3 className="font-serif text-2xl">Huez</h3>
          <div className="flex gap-2 items-center">
            <p className="text-xs text-[#A6AEBF]">Fuel Your Day, Your Way</p>
            <LiaShippingFastSolid size={30} color="#A6AEBF" />
          </div>
        </div>
        <div className="flex justify-end">
          <PrimaryButton
            onClickHandler={() => {}}
            label="Order Now"
            className="bg-[#B17457] rounded-[0.7rem] text-black-900 font-bold text-sm py-2"
          />
        </div>
      </div>

      <div className="bg-black-900 text-white">Huez</div>
    </div>
  );
}

export default New;
