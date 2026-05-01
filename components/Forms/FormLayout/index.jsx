"use client";

export default function FormLayout({ children, visible, className }) {
  return (
    <div
      className={`${visible ? "hidden" : "flex"}  
        w-full xs:w-[450px] items-center justify-center 
        bg-white py-6  rounded-[35px] shadow-lg select-none
        m-auto
        ${className}
      `}
    >
      {children}
    </div>
  );
}
