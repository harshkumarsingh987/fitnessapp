 import { Button, Card, CardContent, Stack, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Calculate } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { resourceApi } from "../api/trackerApi";
import PageHeader from "../components/PageHeader";
import TrackerTable from "../components/TrackerTable";
import { useAuth } from "../context/AuthContext";
import { inputDate } from "../utils/date";

const bmiApi = resourceApi("/bmi");

const Bmi = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({ heightCm: user?.heightCm || 170, weightKg: 70, date: inputDate() });
  const [rows, setRows] = useState([]);

  const load = () => bmiApi.list().then(({ data }) => setRows(data));

  useEffect(() => {
    load();
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    await bmiApi.create(form);
    load();
  };

  const remove = async (id) => {
    await bmiApi.remove(id);
    load();
  };

  const preview = form.heightCm > 0 ? (form.weightKg / (form.heightCm / 100) ** 2).toFixed(1) : "--";

  return (
    <>
      <PageHeader title="BMI Calculator" subtitle="Calculate and save BMI snapshots with automatic category labels." />
      <Card variant="outlined">
        <CardContent>
          <Grid container spacing={2} component="form" onSubmit={submit}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                fullWidth
                label="Height cm"
                type="number"
                value={form.heightCm}
                onChange={(e) => setForm({ ...form, heightCm: Number(e.target.value) })}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                fullWidth
                label="Weight kg"
                type="number"
                value={form.weightKg}
                onChange={(e) => setForm({ ...form, weightKg: Number(e.target.value) })}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                fullWidth
                label="Date"
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ sm: "center" }}>
                <Button startIcon={<Calculate />} variant="contained" type="submit">
                  Save BMI
                </Button>
                <Typography color="text.secondary">Current calculation: {preview}</Typography>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <TrackerTable
        rows={rows}
        onDelete={remove}
        columns={[
          { key: "heightCm", label: "Height cm" },
          { key: "weightKg", label: "Weight kg" },
          { key: "bmi", label: "BMI" },
          { key: "category", label: "Category" }
        ]}
      />
    </>
  );
};

export default Bmi;
