import { IoIosCheckbox } from 'react-icons/io';
import { MdCheckBoxOutlineBlank } from 'react-icons/md';

export const Checkbox = ({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) => {
  return (
    <label className="flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="hidden"
      />

      {checked ? <IoIosCheckbox /> : <MdCheckBoxOutlineBlank color="gray" />}
      <span className="ml-2 text-black text-sm">{label}</span>
    </label>
  );
};
