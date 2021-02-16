// AUTH0
import { useAuth0 } from "@auth0/auth0-react";
// CHART
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import React from "react";

function Chart(props) {
  // AUTH0
  const { isAuthenticated } = useAuth0();

  let stroke = ["#00af91"];
  if (props.weightData.length >= 2) {
    if (
      props.weightData[props.weightData.length - 2].weight >
      props.weightData[props.weightData.length - 1].weight
    ) {
      stroke = ["#00af91"];
    } else {
      stroke = ["#f58634"];
    }
  }

  return (
    isAuthenticated && (
      <div className="chart-container">
        <ResponsiveContainer width="95%" height="95%">
          <LineChart
            data={props.weightData}
            margin={{ top: 10, right: 5, bottom: 5, left: 10 }}
          >
            <Line
              name="Gewicht[KG]"
              type="monotone"
              dataKey="weight"
              stroke={stroke}
              strokeWidth="2"
            />
            <CartesianGrid stroke="white" strokeDasharray="5 5" />
            <Legend verticalAlign="top" height={36} />
            <XAxis stroke="white" dataKey="date" />
            <YAxis stroke="white" dataKey="weight" domain={["auto", "auto"]} />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  );
}

export default Chart;
