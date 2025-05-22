import { ChartContainer, ChartLegend, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  BarChart, 
  Bar,
  CartesianGrid, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis,
  LineChart,
  Legend,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";

export const ConsultationsChart = () => {
  const data = [
    { name: 'Jan', consultations: 35 },
    { name: 'Feb', consultations: 28 },
    { name: 'Mar', consultations: 42 },
    { name: 'Apr', consultations: 50 },
    { name: 'May', consultations: 65 },
    { name: 'Jun', consultations: 78 },
    { name: 'Jul', consultations: 90 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis 
          dataKey="name" 
          stroke="rgba(255,255,255,0.5)" 
          tick={{ fill: "rgba(255,255,255,0.7)" }}
        />
        <YAxis 
          stroke="rgba(255,255,255,0.5)" 
          tick={{ fill: "rgba(255,255,255,0.7)" }}
        />
        <Tooltip />
        <Area 
          type="monotone" 
          dataKey="consultations" 
          stroke="#0ea5e9" 
          fillOpacity={1} 
          fill="url(#gradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export const UsersDistributionChart = () => {
  const data = [
    { name: "Doctors", value: 35 },
    { name: "Patients", value: 150 },
    { name: "Admin", value: 5 }
  ];

  const COLORS = ["#0ea5e9", "#10b981", "#8b5cf6"];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={100}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend 
          layout="horizontal" 
          verticalAlign="bottom" 
          align="center"
          wrapperStyle={{ color: "white" }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export const DoctorRatingsChart = () => {
  const data = [
    { name: "Cardiology", rating: 4.8 },
    { name: "Dermatology", rating: 4.5 },
    { name: "Neurology", rating: 4.7 },
    { name: "Pediatrics", rating: 4.9 },
    { name: "Orthopedics", rating: 4.6 },
    { name: "Psychiatry", rating: 4.4 },
  ];

  return (
    <ChartContainer
      className="h-80 w-full"
      config={{
        rating: {
          label: "Average Rating",
          theme: {
            light: "#10b981", // healing-500
            dark: "#10b981",
          },
        },
      }}
    >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="name" 
            stroke="rgba(255,255,255,0.5)" 
            tick={{ fill: "rgba(255,255,255,0.7)" }}
          />
          <YAxis 
            domain={[4, 5]} 
            stroke="rgba(255,255,255,0.5)" 
            tick={{ fill: "rgba(255,255,255,0.7)" }}
          />
          <Tooltip />
          <Bar dataKey="rating" fill="#10b981" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};