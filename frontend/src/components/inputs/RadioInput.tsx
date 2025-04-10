import { useState } from 'react';

interface RadioInputProps {
  label: string;
  name: string;
  value: string;
  defaultChecked?: boolean;
}

const RadioInput: React.FC<RadioInputProps> = ({
  label,
  name,
  value,
  defaultChecked = false,
}) => {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
      <div className="w-3 h-3 flex justify-center items-center border-[1px] border-black-900 rounded-full">
        <input
          type="radio"
          name={name}
          value={value}
          defaultChecked={defaultChecked}
          onChange={() => setChecked((e) => !e)}
          className="w-[0.38rem] h-[0.38rem] appearance-none rounded-full checked:bg-black-900 checked:border-black-900 transition-all duration-200"
        />
      </div>
      <span
        className={` ${
          checked ? 'text-black-900' : 'text-gray-500'
        } tracking-tight`}
      >
        {label}
      </span>
    </label>
  );
};

export default RadioInput;
