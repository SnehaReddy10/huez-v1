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

function Items() {
  return (
    <div className="grid grid-cols-3 md:grid-cols-8 gap-1 md:gap-4 p-1">
      {items.map((x) => (
        <img src={x.url} alt="" className="rounded-sm w-28 h-28" />
      ))}
    </div>
  );
}

export default Items;
