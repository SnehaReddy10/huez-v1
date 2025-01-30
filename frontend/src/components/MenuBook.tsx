function MenuBook() {
  return (
    <div className="text-white p-10 flex">
      <div className=" w-80 h-90 overflow-hidden">
        <div className=" inset-0 animate-rotate-180 border-2 border-b-0 bg-gradient-to-l from-[#9b6e50] to-[#543e35] border-black-900 shadow-lg shadow-slate-400 w-80 h-96"></div>
        <div className=" -bottom-[90%] bg-black-900 shadow-lg shadow-slate-400 w-[50rem] h-96 rounded-t-full -translate-x-40"></div>
      </div>
      <div className="border-2 border-black-900 shadow-lg shadow-slate-400 w-80 h-96 bg-gradient-to-r from-[#9b6e50] to-[#543e35]"></div>
    </div>
  );
}

export default MenuBook;
