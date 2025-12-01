"use client";

export default function FormLayout({ children, visible, className }) {
  return (
    <div
      className={`${visible ? "hidden" : "flex"}  
        w-full xs:w-[450px] items-center justify-center bg-white p-3 sm:p-6 rounded-[35px] shadow-lg select-none
        ${className}
      `}
    >
      {children}
    </div>
  );
}
