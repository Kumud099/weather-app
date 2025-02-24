export default function WeatherSkeleton() {
  return (
    <main className="px-3 max-w-7x1 flex flex-col gap-9 w-full pb-10 pt-4 animate-pulse">
      {/* Today's data */}
      <section className="flex gap-1 text2xl items-end text-white relative border-none rounded-2xl bg-gray-700 h-48"></section>

      {/* Time and weather icon */}
      <section>
        <div className="flex gap-1 text-2xl items-center">
          <div className="flex gap-10 sm:gap-15 overflow-x-auto w-full justify-between pr-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="px-5 flex flex-col justify-center items-center gap-2 text-xs font-semibold"
              >
                <div className="w-16 h-6 bg-gray-600 rounded"></div>
                <div className="w-12 h-12 bg-gray-500 rounded-full"></div>
                <div className="w-20 h-4 bg-gray-600 rounded"></div>
                <div className="w-10 h-6 bg-gray-600 rounded"></div>
              </div>
            ))}
          </div>
        </div>
        <div className="px-6 gap-4 justify-between overflow-x-auto flex">
          <div className="w-full h-24 bg-gray-700 rounded"></div>
        </div>
      </section>

      {/* 7 days forecast data */}
      <section className="flex flex-col w-full">
        <p className="text-white text-2xl">Forecast (7 days)</p>
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-4 bg-gray-700 rounded mt-2"
          >
            <div className="w-24 h-6 bg-gray-600 rounded"></div>
            <div className="w-12 h-12 bg-gray-500 rounded-full"></div>
            <div className="w-24 h-6 bg-gray-600 rounded"></div>
            <div className="w-10 h-6 bg-gray-600 rounded"></div>
          </div>
        ))}
      </section>
    </main>
  );
}
