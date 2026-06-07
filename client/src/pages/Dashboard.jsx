 import { Card, CardContent, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { FitnessCenter, LocalDrink, MonitorWeight, Restaurant, Straighten } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { analyticsApi } from "../api/trackerApi";
import MetricCard from "../components/MetricCard";
import PageHeader from "../components/PageHeader";

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    Promise.all([analyticsApi.summary(), analyticsApi.progress()]).then(([summaryRes, progressRes]) => {
      setSummary(summaryRes.data);
      setProgress(progressRes.data);
    });
  }, []);

  const calorieProgress = summary ? (summary.caloriesConsumed / summary.goals.calories) * 100 : 0;
  const waterProgress = summary ? (summary.waterMl / summary.goals.waterMl) * 100 : 0;

  return (
    <>
      <PageHeader title="Dashboard" subtitle="Today at a glance across movement, food, water, weight, and BMI." />
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, lg: 2.4 }}>
          <MetricCard title="Workout Minutes" value={`${summary?.workoutMinutes || 0} min`} icon={<FitnessCenter color="primary" />} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 2.4 }}>
          <MetricCard
            title="Calories Consumed"
            value={summary?.caloriesConsumed || 0}
            helper={`Goal ${summary?.goals.calories || 0}`}
            progress={calorieProgress}
            icon={<Restaurant color="secondary" />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 2.4 }}>
          <MetricCard
            title="Water"
            value={`${summary?.waterMl || 0} ml`}
            helper={`Goal ${summary?.goals.waterMl || 0} ml`}
            progress={waterProgress}
            icon={<LocalDrink color="primary" />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 2.4 }}>
          <MetricCard title="Latest Weight" value={`${summary?.latestWeight?.weightKg || "--"} kg`} icon={<MonitorWeight color="primary" />} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 2.4 }}>
          <MetricCard title="Latest BMI" value={summary?.latestBmi?.bmi || "--"} helper={summary?.latestBmi?.category} icon={<Straighten color="secondary" />} />
        </Grid>
      </Grid>
      <Card variant="outlined">
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h6">Calories Over Time</Typography>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={progress?.calories || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#1f8a70" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};

export default Dashboard;
