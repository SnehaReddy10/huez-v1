import PrimaryButton from './buttons/PrimaryButton';

function Offer({ offer }: any) {
  return (
    <div
      key={offer.id}
      className="relative p-4 border rounded-lg shadow-lg bg-white flex flex-col gap-2"
    >
      <span className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 text-xs font-bold rounded">
        {offer.discount}
      </span>

      <img
        src={offer.image}
        alt={offer.name}
        className="w-full h-32 object-cover rounded-md"
      />

      <h3 className="text-lg font-semibold mt-3">{offer.name}</h3>
      <p className="text-gray-600 text-xs">{offer.description}</p>

      <PrimaryButton
        label="Claim Offer"
        onClickHandler={() => {}}
        className="px-4 py-1"
      />
    </div>
  );
}

export default Offer;
