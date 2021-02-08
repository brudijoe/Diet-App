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
  // AUTH
  const { isAuthenticated } = useAuth0();

  // WENN INDEX DAVOR GRÖSSER IST ALS DANACH dann FARBE GRÜN SONST ROT
  // ICH BRAUCHE IMMER DEN LETZTEN INDEX UND DEN DAVOR
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
    <div className="chart-container">
      {isAuthenticated && (
        <ResponsiveContainer width="95%" height={400}>
          <LineChart
            data={props.weightData}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <Line
              name="Gewicht[KG]"
              type="monotone"
              dataKey="weight"
              stroke={stroke}
              strokeWidth="2"
            />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Legend verticalAlign="top" height={36} />
            <XAxis dataKey="date" />
            <YAxis dataKey="weight" domain={["auto", "auto"]} />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default Chart;
