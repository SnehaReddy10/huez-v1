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
      className={twMerge(`flex items-center justify-center w-max border-2
      hover:border-orange-500 px-4 py-1
       ${
         isSelected
           ? 'border-orange-500 px-4 py-1'
           : 'border-gray-300 px-4 py-1'
       } rounded-full 
       text-xxs font-semibold transition-all ease ${className} text-xxs`)}
    >
      {label}
      {icon}
    </div>
  );
}

export default TagButton;
