import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
} from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const performanceData = [
  { month: "Jan", revenue: 186, expenses: 82 },
  { month: "Feb", revenue: 305, expenses: 148 },
  { month: "Mar", revenue: 237, expenses: 120 },
  { month: "Apr", revenue: 273, expenses: 154 },
  { month: "May", revenue: 209, expenses: 103 },
  { month: "Jun", revenue: 314, expenses: 165 },
]

const performanceConfig = {
  revenue: { label: "Revenue", color: "var(--chart-1)" },
  expenses: { label: "Expenses", color: "var(--chart-3)" },
} satisfies ChartConfig

const channelData = [
  { channel: "Organic", visitors: 420, fill: "var(--chart-1)" },
  { channel: "Referral", visitors: 280, fill: "var(--chart-2)" },
  { channel: "Social", visitors: 190, fill: "var(--chart-3)" },
  { channel: "Email", visitors: 150, fill: "var(--chart-4)" },
]

const channelConfig = {
  visitors: { label: "Visitors" },
  organic: { label: "Organic", color: "var(--chart-1)" },
  referral: { label: "Referral", color: "var(--chart-2)" },
  social: { label: "Social", color: "var(--chart-3)" },
  email: { label: "Email", color: "var(--chart-4)" },
} satisfies ChartConfig

const pointData = [
  { day: 1, score: 38 },
  { day: 2, score: 52 },
  { day: 3, score: 44 },
  { day: 4, score: 68 },
  { day: 5, score: 61 },
  { day: 6, score: 79 },
  { day: 7, score: 74 },
  { day: 8, score: 91 },
  { day: 9, score: 83 },
]

const pointConfig = {
  score: { label: "Focus score", color: "var(--chart-5)" },
} satisfies ChartConfig

const candleData = [
  { day: "Mon", range: [92, 108], direction: "up" },
  { day: "Tue", range: [101, 95], direction: "down" },
  { day: "Wed", range: [98, 116], direction: "up" },
  { day: "Thu", range: [118, 111], direction: "down" },
  { day: "Fri", range: [110, 123], direction: "up" },
  { day: "Sat", range: [121, 128], direction: "up" },
  { day: "Sun", range: [126, 119], direction: "down" },
]

const candleConfig = {
  range: { label: "Price" },
} satisfies ChartConfig

export function BarChartExample() {
  return (
    <ChartContainer config={performanceConfig} className="h-64 w-full max-w-2xl">
      <BarChart accessibilityLayer data={performanceData} margin={{ left: 4, right: 4 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} width={28} />
        <ChartTooltip content={<ChartTooltipContent indicator="dashed" />} />
        <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[5, 5, 0, 0]} />
        <Bar dataKey="expenses" fill="var(--color-expenses)" radius={[5, 5, 0, 0]} />
      </BarChart>
    </ChartContainer>
  )
}

export function LineChartExample() {
  return (
    <ChartContainer config={performanceConfig} className="h-64 w-full max-w-2xl">
      <LineChart accessibilityLayer data={performanceData} margin={{ left: 4, right: 4 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} width={28} />
        <ChartTooltip content={<ChartTooltipContent indicator="dashed" />} />
        <Line dataKey="revenue" type="linear" stroke="var(--color-revenue)" strokeWidth={2.5} dot={{ r: 4, fill: "var(--background)", strokeWidth: 2.5 }} />
        <Line dataKey="expenses" type="linear" stroke="var(--color-expenses)" strokeWidth={2.5} strokeDasharray="5 5" dot={{ r: 3, fill: "var(--background)", strokeWidth: 2 }} />
      </LineChart>
    </ChartContainer>
  )
}

export function DotChartExample() {
  return (
    <ChartContainer config={pointConfig} className="h-64 w-full max-w-2xl">
      <ScatterChart accessibilityLayer margin={{ left: 4, right: 12, top: 12, bottom: 4 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="day" type="number" name="Day" tickLine={false} axisLine={false} tickMargin={10} />
        <YAxis dataKey="score" type="number" name="Score" domain={[20, 100]} tickLine={false} axisLine={false} width={28} />
        <ChartTooltip cursor={{ strokeDasharray: "4 4" }} content={<ChartTooltipContent indicator="dot" />} />
        <Scatter data={pointData} fill="var(--color-score)" />
      </ScatterChart>
    </ChartContainer>
  )
}

export function CandlestickChartExample() {
  return (
    <ChartContainer config={candleConfig} className="h-64 w-full max-w-2xl">
      <BarChart accessibilityLayer data={candleData} margin={{ left: 4, right: 4 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={10} />
        <YAxis domain={[80, 140]} tickLine={false} axisLine={false} width={28} />
        <ChartTooltip content={<ChartTooltipContent labelFormatter={(label) => `${label} trading`} />} />
        <Bar dataKey="range" shape={<Candlestick />} />
      </BarChart>
    </ChartContainer>
  )
}

function Candlestick({ height, payload, width, x, y }: any) {
  const isUp = payload.direction === "up"
  const color = isUp ? "var(--chart-2)" : "var(--chart-5)"
  const bodyHeight = Math.max(height, 4)
  const center = x + width / 2

  return (
    <g>
      <line x1={center} x2={center} y1={y - 10} y2={y + bodyHeight + 10} stroke={color} strokeWidth={1.5} />
      <rect x={x + 3} y={y} width={Math.max(width - 6, 3)} height={bodyHeight} rx={2} fill={color} />
    </g>
  )
}

export function DonutChartExample() {
  return (
    <ChartContainer config={channelConfig} className="h-64 w-full max-w-md">
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent nameKey="channel" hideLabel />} />
        <Pie
          data={channelData}
          dataKey="visitors"
          nameKey="channel"
          innerRadius={58}
          outerRadius={94}
          paddingAngle={3}
          cornerRadius={5}
        />
      </PieChart>
    </ChartContainer>
  )
}

export function PieChartExample() {
  return (
    <ChartContainer config={channelConfig} className="h-64 w-full max-w-md">
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent nameKey="channel" hideLabel />} />
        <Pie data={channelData} dataKey="visitors" nameKey="channel" outerRadius={98} paddingAngle={2} cornerRadius={3} />
      </PieChart>
    </ChartContainer>
  )
}
