

export default function Header({ children }) {
  return (
    <header className="flex items-center justify-center bg-[rgb(var(--blue-50))] p-4 sm:p-6 rounded-[35px] shadow-lg select-none">  
      {children}
    </header>
  );
}

