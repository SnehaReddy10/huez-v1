import { twMerge } from 'tailwind-merge';

function TagButton({
  label,
  icon,
  isSelected,
  onClick,
  className = '',
}: {
  label: string;
  icon: any;
  isSelected: boolean;
  onClick: any;
  className?: string;
}) {
  return (
    <div
      onClick={onClick}
      className={twMerge(`flex gap-2 items-center justify-center w-max border-[1px]
      hover:border-orange-500
       ${
         isSelected
           ? 'bg-orange-500 border-orange-500 px-4 py-1 text-white'
           : 'border-gray-300 px-4 py-1'
       } rounded-full
       font-semibold transition-all ease ${className} text-xxs`)}
    >
      {icon && (
        <img
          src={icon}
          alt=""
          className={`w-6 h-6 p-1 border-[2px] border-gray-100 rounded-full ${
            isSelected ? 'bg-white' : ''
          }`}
        />
      )}
      <p className={`${isSelected ? 'text-white' : ''}`}>{label}</p>
    </div>
  );
}

export default TagButton;
