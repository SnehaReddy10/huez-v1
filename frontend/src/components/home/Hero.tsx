import Typewriter from '../common/Typewriter';
import SearchBar from '../common/SearchBar';

function Hero() {
  return (
    <div className="">
      <img
        src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
        className="w-screen background"
      />
      <div className="absolute inset-0 text-white font-serif mt-20 md:mt-40">
        <div className="h-screen flex flex-col gap-4 items-center">
          <p className="text-xs md:text-xl w-48 md:w-96 text-center font-bold">
            <Typewriter
              text="Bringing restaurant-quality meals to your table without compromise!"
              delay={60}
            />
          </p>
          <SearchBar />
        </div>
      </div>
    </div>
  );
}

export default Hero;
