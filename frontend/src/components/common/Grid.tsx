import { RxCross2 } from 'react-icons/rx';
import { twMerge } from 'tailwind-merge';

function Grid({ title, headers, rows, onDelete, className }: any) {
  return (
    <div className={twMerge(`overflow-x-auto w-full ${className}`)}>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <caption className="text-lg font-semibold p-4">{title}</caption>
        <thead className="">
          <tr className="hover:bg-black text-gray-500">
            {headers.map((x: any) => (
              <th
                key={x.id}
                className={`px-6 py-3 ${x.className} text-[0.75rem]`}
              >
                {x.label}
              </th>
            ))}
            <th className="px-6 py-3 text-center w-[100px]"></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((x: any) => (
            <tr
              key={x.id}
              onClick={() => x[0]?.onClick?.()}
              className="border-t hover:bg-gray-100 transition-all ease text-xs"
            >
              {x.map((y: any) => (
                <td className={`py-2 ${y.className}`}>{y.label}</td>
              ))}
              <td className="px-6 py-4">
                <button
                  onClick={() => onDelete(x[0]?.id)}
                  className="flex gap-2 justify-center items-center"
                >
                  <RxCross2 size={25} color="black" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Grid;
