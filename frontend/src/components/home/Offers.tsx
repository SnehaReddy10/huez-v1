import React from 'react';
import Offer from '../Offer';
import { offers } from '../../static';

interface Offer {
  id: number;
  name: string;
  discount: string;
  image: string;
  description: string;
}

const Offers: React.FC = () => {
  return (
    <div className="p-6">
      <h2 className="w-full text-center py-4">Deals</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {offers.map((offer) => (
          <Offer key={offer.id} offer={offer} />
        ))}
      </div>
    </div>
  );
};

export default Offers;
