

export default function InputLayout({ children, className }) {
  return (
    <div className={`flex items-center justify-center  bg-[rgb(var(--input-bg))] rounded-[5px] mb-4 cursor-pointer  flex-col  position: relative 
      ${className}
    `}>
      {children}
    </div>
  );
}