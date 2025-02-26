import { useEffect, useState } from 'react';
import { useSearchQuery } from '../store';
import SearchBar from './common/SearchBar';
import Carousel from './common/Carousel';
import SearchLoader from './loaders/SearchLoader';

function Search() {
  const [searchString, setSearchString] = useState('');
  const [loading, setLoading] = useState(false);
  let { data: searchResult, isFetching } = useSearchQuery(searchString);

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
        onChangeHandler={(e: any) => setSearchString(e.target.value)}
        className="border-[2px] border-black-900"
      />

      <>
        {loading || isFetching ? (
          <SearchLoader />
        ) : (
          <>
            {searchResult?.menuItems?.length > 0 && (
              <div className="shadow-xl shadow-gray-100 py-6">
                {searchResult?.menuItems?.length !== null && (
                  <Carousel
                    totalItems={searchResult?.menuItems?.length ?? 0}
                    children={
                      <>
                        {searchResult?.menuItems?.map((x: any) => (
                          <div className="bg-gray-100 p-1 flex gap-4 items-center w-64 h-40 shrink-0">
                            <img
                              src={x.imageUrl}
                              alt=""
                              className="w-1/2 h-full object-cover"
                            />
                            <div className="flex flex-col w-24">
                              <p className="text-xs">{x.name}</p>
                              <p className="text-xxs text-gray-600 line-clamp-3">
                                {x.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </>
                    }
                  />
                )}
              </div>
            )}
            {searchResult?.restaurants?.length > 0 && (
              <div className="shadow-xl shadow-gray-100 py-6">
                {searchResult?.restaurants?.length !== null && (
                  <Carousel
                    totalItems={searchResult?.restaurants?.length ?? 0}
                    children={
                      <>
                        {searchResult?.restaurants?.map((x: any) => (
                          <div className="bg-gray-100 p-1 flex gap-4 items-center w-64 h-40 shrink-0">
                            <img
                              src={x.imageUrl}
                              alt=""
                              className="w-1/2 h-full object-cover"
                            />
                            <div className="flex flex-col w-24">
                              <p className="text-xs">{x.name}</p>
                              <p className="text-xxs text-gray-600 line-clamp-3">
                                {x.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </>
                    }
                  />
                )}
              </div>
            )}
          </>
        )}
      </>
    </div>
  );
}

export default Search;
