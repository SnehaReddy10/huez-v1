import Carousel from '../common/Carousel';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../common/SearchBar';
import TagButton from '../buttons/tag-button/TagButton';
import { useContext, useEffect, useState } from 'react';
import {
  useGetOffersQuery,
  useGetPopularProductsQuery,
  useGetProductsQuery,
} from '../../store';
import { ToastContext } from '../../context/ToastContext';
import {
  CarouselRestaurantItem,
  CarouselRestaurantItemSkeleton,
} from './CarouselRestaurantItem';
import { CarouselMenuItem, CarouselMenuItemSkeleton } from './CarouselmenuItem';
import {
  CarouselOfferItem,
  CarouselOfferItemSkeleton,
} from './CarouselOfferItem';
import { HomeTopBar } from './HomeTopBar';

const restaurants = [
  {
    id: 'restaruant1',
    imageUrl:
      'https://restaurantindia.s3.ap-south-1.amazonaws.com/s3fs-public/2025-01/photo-1414235077428-338989a2e.JPG',
    restarantName: 'Spice Symphony',
    rating: 4.5,
    time: '30 mins',
  },
  {
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSWGa7nz-J8ZfjAVxPSsPdXwLJw1ajyWAEmQ&s',
    restarantName: 'The Pasta Place',
    rating: 4.2,
    time: '25 mins',
  },
  {
    id: 'restaruant3',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnAYSshw5Bi2xIgU-e2xDXUPzH9ZgruvSJhw&s',
    restarantName: 'Urban Biryani',
    rating: 4.7,
    time: '35 mins',
  },
  {
    id: 'restaruant4',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2ZDx_kliB6hI-C4Dp8gOjJYA11msQNEmbDA&s',
    restarantName: 'Green Bowl Salads',
    rating: 4.3,
    time: '20 mins',
  },
  {
    id: 'restaruant5',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSomD_SRLLEk9xG_yaJzDrueH8RSN2V6-uVNg&s',
    restarantName: 'Burger Hive',
    rating: 4.0,
    time: '28 mins',
  },
];

function MobileHomeView() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const toastContext = useContext(ToastContext);
  const {
    data: offers,
    error: fetchingOffersFailed,
    isFetching: isFetchingOffers,
  } = useGetOffersQuery({});
  const { data: popularProducts, isFetching: isFetchingPopularProducts } =
    useGetPopularProductsQuery({});
  const { data: products, isFetching: isFetchingProducts } =
    useGetProductsQuery({
      limit: 20,
      cursor: 0,
    });

  useEffect(() => {
    if (!toastContext) {
      throw new Error('useContext must be used within a ToastProvider');
    }
    const { showToast } = toastContext;

    if (fetchingOffersFailed) {
      const r = fetchingOffersFailed as any;
      showToast(r.data?.message ?? r.data?.error[0], 'error', 'right-0 top-10');
    }
  }, [fetchingOffersFailed, toastContext]);

  useEffect(() => {
    setSelectedCategory(popularProducts?.[0]?.category);
  }, [popularProducts]);

  return (
    <div className="md:hidden bg-gray-100 flex flex-col gap-2">
      <div>
        <HomeTopBar />
        <div className="bg-white w-full md:max-w-xl xl:max-w-2xl mx-auto">
          <div className="py-2 w-full bg-white">
            <SearchBar
              inputClassName="rounded-s-md rounded-e-none bg-gray-100 w-full h-8"
              className="w-full px-2"
              buttonClassName="bg-gray-100 rounded-e-md"
              iconColor="orange"
            />
          </div>
          <div className="px-2 flex gap-2">
            {popularProducts?.map((x: any) => (
              <TagButton
                label={x.category}
                isSelected={selectedCategory == x.category}
                onClick={() => {
                  setSelectedCategory(x.category);
                  navigate('/menu', {
                    state: { searchCategory: x.category },
                  });
                }}
              />
            ))}
          </div>
        </div>
        {isFetchingOffers ? (
          <CarouselOfferItemSkeleton />
        ) : (
          <Carousel
            className="bg-white py-4"
            enableAutoPlay={true}
            slides={offers?.data}
            carouselItem={CarouselOfferItem}
            slidesPerView={1}
            slidesPerGroup={1}
            showPagination={true}
          />
        )}
      </div>
      {isFetchingProducts ? (
        <div className="flex justify-between px-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <CarouselMenuItemSkeleton key={index} />
          ))}
        </div>
      ) : (
        <Carousel
          className="bg-white pt-2 pb-0"
          carouselItem={({ slide }) => CarouselMenuItem({ slide, navigate })}
          slides={products?.data}
          slidesPerView={4}
          slidesPerGroup={2}
          showPagination={true}
        />
      )}

      {isFetchingPopularProducts ? (
        <CarouselRestaurantItemSkeleton />
      ) : (
        <Carousel
          className="bg-white"
          carouselItem={CarouselRestaurantItem}
          slides={restaurants}
          slidesPerView={1.2}
          slidesPerGroup={1}
        />
      )}
    </div>
  );
}

export default MobileHomeView;
