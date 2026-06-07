 import { Card, CardContent, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { analyticsApi } from "../api/trackerApi";
import PageHeader from "../components/PageHeader";

const dayLabel = (item) => item._id || new Date(item.date).toLocaleDateString();

const ChartCard = ({ title, children }) => (
  <Card variant="outlined">
    <CardContent>
      <Stack spacing={2}>
        <Typography variant="h6">{title}</Typography>
        {children}
      </Stack>
    </CardContent>
  </Card>
);

const Analytics = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    analyticsApi.progress().then(({ data: progress }) => setData(progress));
  }, []);

  const weightData = data?.weights?.map((entry) => ({ ...entry, label: dayLabel(entry) })) || [];
  const bmiData = data?.bmi?.map((entry) => ({ ...entry, label: dayLabel(entry) })) || [];

  return (
    <>
      <PageHeader title="Progress Analytics" subtitle="Review trends across nutrition, training, hydration, weight, and BMI." />
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <ChartCard title="Calories Consumed">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data?.calories || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="total" stroke="#1f8a70" fill="#1f8a70" fillOpacity={0.24} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <ChartCard title="Water Intake">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data?.water || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="total" stroke="#2196f3" fill="#2196f3" fillOpacity={0.22} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <ChartCard title="Workout Calories">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data?.workoutCalories || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="total" stroke="#ff7a59" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <ChartCard title="Weight Trend">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weightData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="weightKg" stroke="#7c4dff" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <ChartCard title="BMI Trend">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={bmiData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="bmi" stroke="#607d8b" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
      </Grid>
    </>
  );
};

export default Analytics;
