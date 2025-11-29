

export default function InputLayout({ children }) {
  return (
      <div 
          className="flex items-center justify-center  bg-[rgb(var(--input-bg))] rounded-[5px] mb-4 cursor-pointer flex-col  position: relative "
      >
          {children}
      </div>
  );
}