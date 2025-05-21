import { Card } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

const CardProgressChart = ({ progressWeek }) => {
  // Convertimos fecha a nombre del día (Lun, Mar, etc.) usando date-fns con locale español
  const formattedData = progressWeek.map((entry) => ({
    ...entry,
    day: format(parseISO(entry.date), "EEE", { locale: es }),
  }));

  return (
    <Card
      style={{
        width: "100%",
        backgroundColor: "#1c1c1c",
        color: "white",
        border: "0",
        borderRadius: 12,
        padding: "20px",
        height: "100%",
      }}
    >
      <h3 style={{ color: "#fff", marginBottom: 60 }}>Tu progreso esta semana</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          data={formattedData}
          margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="day" stroke="#ccc" />
          <YAxis stroke="#ccc" allowDecimals={false} />
          <Tooltip formatter={(v) => (v ? "✅" : "❌")} />
          <Line
            type="monotone"
            dataKey="hasDetection"
            stroke="#00c46b"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default CardProgressChart;