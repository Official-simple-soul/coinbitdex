import chart1 from "/images/chart-1.png";
import chart2 from "/images/chart-2.png";
import chart3 from "/images/chart-3.png";
import chart4 from "/images/chart-4.png";
import chart5 from "/images/chart-5.png";
import chart6 from "/images/chart-6.png";

const cardImages = [chart1, chart2, chart3, chart4, chart5, chart6];

const ChartCardGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {cardImages.map((image, index) => (
        <div
          key={index}
          className={`rounded-lg h-64 flex flex-col justify-between ${
            index % 2 === 0 ? "translate-y-0" : "translate-y-[50%]"
          } transform transition-transform hover:scale-105`}
        >
          <img src={image} alt="" className="w-full h-full rounded-m" />
        </div>
      ))}
    </div>
  );
};

export default ChartCardGrid;
