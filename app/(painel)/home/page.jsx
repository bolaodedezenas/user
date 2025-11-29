
export default function Home() {


  return (
    <section className='h-full flex flex-col items-center justify-center bg-[rgb(var(--blue-50))] p-4'>
      {/* <FallingBalls count={8} /> Número de bolas */}
      <h1 className='text-[2rem] sm:text-[4.3rem] lg:text-[6rem] text-center  text-black font-bold justify-center position:relative z-10 '>
        {' '}
        Bolão de Dezenas
      </h1>
      <p className='text-[1.5rem] sm:text-[2rem] lg:text-[3rem]  text-center text-black position:relative z-10 '>
        Em construção!
      </p>
    </section>
  );
}
