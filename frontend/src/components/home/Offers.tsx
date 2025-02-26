import React, { useContext, useEffect } from 'react';
import Offer from '../Offer';
import { useGetOffersQuery } from '../../store';
import Loader from '../loaders/Loader';
import { ToastContext } from '../../context/ToastContext';

interface Offer {
  id: number;
  name: string;
  discount: string;
  image: string;
  description: string;
}

const Offers: React.FC = () => {
  const {
    data: offers,
    isFetching: fetchingOffers,
    error: fetchingOffersFailed,
  } = useGetOffersQuery({});

  const toastContext = useContext(ToastContext);

  useEffect(() => {
    if (!toastContext) {
      throw new Error('useContext must be used within a ToastProvider');
    }
    const { showToast } = toastContext;

    if (fetchingOffersFailed) {
      const r = fetchingOffersFailed as any;
      showToast(r.data?.message ?? r.data?.error[0], 'error', 'right-0 top-10');
    }
  }, [fetchingOffersFailed]);

  if (fetchingOffers) {
    return <Loader />;
  }

  return (
    <div className="p-6 pb-20">
      <h2 className="w-full text-center py-4">
        Exclusive Deals & Special Offers
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {offers?.data?.map((offer: any) => (
          <Offer key={offer._id} offer={offer} />
        ))}
      </div>
    </div>
  );
};

export default Offers;
