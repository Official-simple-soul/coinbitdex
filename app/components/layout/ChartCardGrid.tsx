import chart1 from '/images/chart-1.png';
import chart2 from '/images/chart-2.png';
import chart3 from '/images/chart-3.png';
import chart4 from '/images/chart-4.png';
import chart5 from '/images/chart-5.png';
import chart6 from '/images/chart-6.png';

const cardImages = [chart1, chart2, chart3, chart4, chart5, chart6];

const ChartCardGrid = () => {
  return (
    <div className="grid grid-cols-2 gap-2 px-4">
      {cardImages.map((image, index) => (
        <div
          key={index}
          className={`rounded-lg h-auto flex flex-col justify-between ${
            index % 2 === 0 ? 'translate-y-0' : 'translate-y-[50%]'
          } transform transition-transform hover:scale-105`}
        >
          <img
            src={image}
            alt=""
            className="md:w-full md:h-full rounded-m mix-blend-screen"
          />
        </div>
      ))}
    </div>
  );
};

export default ChartCardGrid;
