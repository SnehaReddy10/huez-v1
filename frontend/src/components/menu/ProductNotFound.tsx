import ConfusedChef from './ConfusedChef';
import Carousel from '../common/Carousel';
const items = [
  {
    id: 1,
    url: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 2,
    url: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 3,
    url: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 4,
    url: 'https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 5,
    url: 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 6,
    url: 'https://images.pexels.com/photos/803963/pexels-photo-803963.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 7,
    url: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 8,
    url: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

export default function ProductNotFound() {
  return (
    <div className="flex flex-col items-center gap-3 min-h-screen bg-gray-100 p-14 text-xs">
      <ConfusedChef />

      <h2 className="text-2xl font-bold text-gray-800">
        Oops! No Results Found
      </h2>
      <p className="text-gray-600 mt-2 text-center max-w-md">
        We couldn't find the item you're looking for. Try searching for
        something else or check out our popular dishes!
      </p>

      <Carousel
        slides={items}
        carouselItem={({ slide }) => (
          <div key={slide.id} className="relative w-24 h-24 shrink-0">
            <img
              src={slide.url}
              alt={`Item ${slide.id}`}
              className="rounded-full w-24 h-24 object-cover"
            />
            <span className="absolute inset-0 rounded-full bg-black-900 opacity-0 hover:opacity-30  transition-all ease-in" />
          </div>
        )}
      />
    </div>
  );
}
