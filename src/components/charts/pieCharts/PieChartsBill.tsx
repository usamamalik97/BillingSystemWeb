import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
interface PieChartsInterface {
  data: any[];
}

const PieChartsBill = ({ data }: PieChartsInterface) => {
  const customColors = ["#388e3c", "#f4511e", "#FBA827"];
  console.log("PieChartsBillData");
  console.log(data);
  if (!data) return;
  const getData = () => {
    const billStats = [
      {
        value: Math.abs(data[0].value),
        name: data[0].name,
      },

      {
        value: Math.abs(data[1].value),
        name: data[1].name,
      },
      {
        value: Math.abs(data[2].value),
        name: data[2].name,
      },
    ];
    return billStats;
  };
  return (
    <ResponsiveContainer width="100%" height={150}>
      <PieChart>
        {/* Specify dataKey and data for Pie */}
        <Pie
          data={getData()}
          dataKey="value" // Assuming "value" is the data key for the slice values
          nameKey="name" // Assuming "name" is the data key for the slice names
          outerRadius={60}
        >
          {/* Use colors property to set custom colors */}
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={customColors[index % customColors.length]}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartsBill;
