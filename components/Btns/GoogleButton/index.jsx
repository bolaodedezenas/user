"user client";

export default function GoogleButton({ onClick }) {

  return (
    <div
        onClick={onClick}
        className="
          w-full 
          border-0
          text-[#3d3d3d] 
          py-3 
          rounded-[5px]
          flex 
          items-center 
          justify-center 
          gap-2 
          bg-[rgb(var(--btn-bg-secundary))] hover:bg-[rgb(var(--btn-bg-secundary-hover))] 
          transition-colors duration-500 
          cursor-pointer 
          text-[1rem]
          font-light
          "
        >
        <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-5 h-5"
        />
        Entrar com Google
    </div>
  );
}