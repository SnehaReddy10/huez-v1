import { useEffect, useState } from 'react';
import { useSearchQuery } from '../store';
import SearchBar from './common/SearchBar';
import Carousel from './common/Carousel';
import SearchLoader from './loaders/SearchLoader';
import { IoLocationOutline } from 'react-icons/io5';

function Search() {
  const [searchString, setSearchString] = useState('');
  const [menuCursor, setMenuCursor] = useState('');
  const [restaurantCursor, setRestaurantCursor] = useState('');
  const [loading, setLoading] = useState(false);
  const { data: searchResult, isFetching } = useSearchQuery(
    {
      searchQuery: searchString,
      menuCursor,
      restaurantCursor,
    },
    { skip: !searchString }
  );

  const loadMore = () => {
    if (searchResult?.nextMenuCursor) {
      setMenuCursor(searchResult.nextMenuCursor);
    }
    if (searchResult?.nextRestaurantCursor) {
      setRestaurantCursor(searchResult.nextRestaurantCursor);
    }
  };

  useEffect(() => {
    if (searchString) {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [searchString]);

  return (
    <div className="w-full py-10 flex flex-col gap-4 justify-start items-center">
      <SearchBar
        autoFocus={true}
        onChangeHandler={(e: any) => setSearchString(e.target.value)}
        className="border-[2px] border-black-900"
      />

      {loading || isFetching ? (
        <SearchLoader />
      ) : (
        <>
          {searchResult !== '' &&
          searchResult?.menuItems?.length === 0 &&
          searchResult.restaurants?.length === 0 ? (
            <div>No Search Result Found</div>
          ) : (
            <>
              <SearchResult searchResult={searchResult} />
              <button
                onClick={loadMore}
                className="bg-primary text-white px-4 py-2 rounded-lg"
              >
                Load more
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}

function SearchResult({ searchResult }: { searchResult: any }) {
  return (
    <>
      {searchResult?.menuItems?.length > 0 && (
        <div className="shadow-xl shadow-gray-100">
          {searchResult?.menuItems?.length !== null && (
            <Carousel
              slides={searchResult?.menuItems}
              slidesPerView={2.2}
              slidesPerGroup={2}
              carouselItem={({ slide }: { slide: any }) => {
                return (
                  <div className="bg-gray-100 p-1 flex md:gap-4 items-center md:w-64 md:h-40 shrink-0">
                    <img
                      src={slide.imageUrl}
                      alt={slide.name}
                      className="md:w-1/2 md:h-full object-cover"
                    />
                    <div className="flex flex-col w-24">
                      <p className="text-xs">{slide.name}</p>
                      <p className="text-xxs text-gray-600 line-clamp-3">
                        {slide.description}
                      </p>
                    </div>
                  </div>
                );
              }}
            />
          )}
        </div>
      )}

      {searchResult?.restaurants?.length > 0 && (
        <div className="shadow-xl shadow-gray-100 py-6">
          {searchResult?.restaurants?.length !== null && (
            <Carousel
              carouselItem={({ slide }: { slide: any }) => (
                <div className="bg-gray-100 p-1 flex gap-4 items-center w-64 h-40 shrink-0">
                  <img
                    src={slide.imageUrl}
                    alt=""
                    className="w-1/2 h-full object-cover"
                  />
                  <div className="flex flex-col gap-2 w-24">
                    <p className="text-xs capitalize font-semibold">
                      {slide.name}
                    </p>
                    <div className="flex gap-[2px] items-center justify-center">
                      <IoLocationOutline size={15} />
                      <p className="text-xxs line-clamp-1">{slide.address}</p>
                    </div>
                    <p className="text-xxs text-gray-600 line-clamp-3">
                      {slide.description}
                    </p>
                  </div>
                </div>
              )}
            />
          )}
        </div>
      )}
    </>
  );
}

export default Search;
