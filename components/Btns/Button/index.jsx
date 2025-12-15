"user client";

export default function Button({ onClick, text, className }) {
  return (
    <button
      onClick={onClick}
      className={`
        text-[1.2rem] 
        text-white
        font-extrabold 
        px-4 py-3 
        w-full
        bg-[rgb(var(--btn))] hover:bg-[rgb(var(--btn-hover))]
        rounded-[5px]  
        transition duration-300 
        cursor-pointer 
        ${className}
      `}
    >
      {text}
    </button>
  );
}
