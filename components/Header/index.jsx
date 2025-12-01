

export default function Header({ children }) {
  return (
    <header
      className=" 
    bg-white h-20 flex justify-center xss:justify-start  gap-4 items-center  p-2 sm:p-6 rounded-[10px] shadow-lg select-none"
    >
      {children}
    </header>
  );
}

