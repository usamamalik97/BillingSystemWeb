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

const PieCharts = ({ data }: PieChartsInterface) => {
  const customColors = ["#ffb74d", "#388e3c"];

  const getData = () => {
    const paymentStats = [
      {
        value: Math.abs(data[0].value),
        name: data[0].name,
      },

      {
        value: Math.abs(data[1].value),
        name: data[1].name,
      },
    ];
    return paymentStats;
  };
  return (
    <ResponsiveContainer width="100%" height={150}>
      <PieChart>
        <Pie
          data={getData()}
          dataKey="value" // Assuming "value" is the data key for the slice values
          nameKey="name" // Assuming "name" is the data key for the slice names
          outerRadius={60}
        >
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

export default PieCharts;
