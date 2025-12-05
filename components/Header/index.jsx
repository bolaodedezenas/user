

export default function Header({ children, className }) {
  return (
    <header
      className={`{
     bg-white w-full  flex flex-wrap  gap-4 items-center   p-3  rounded-[10px] shadow-lg select-none
       ${className}
    `}
    >
      {children}
    </header>
  );
}

