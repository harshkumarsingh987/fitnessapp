 import {
  Button,
  Card,
  CardContent,
  MenuItem,
  Stack,
  TextField
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Add } from "@mui/icons-material";
import React, { useEffect, useMemo, useState } from "react";
import { resourceApi } from "../api/trackerApi";
import PageHeader from "../components/PageHeader";
import TrackerTable from "../components/TrackerTable";
import { inputDate } from "../utils/date";

const TrackerPage = ({ title, subtitle, path, fields, columns }) => {
  const api = useMemo(() => resourceApi(path), [path]);
  const initial = useMemo(
    () =>
      fields.reduce(
        (acc, field) => ({ ...acc, [field.name]: field.defaultValue ?? (field.type === "number" ? 0 : "") }),
        { date: inputDate() }
      ),
    [fields]
  );
  const [form, setForm] = useState(initial);
  const [rows, setRows] = useState([]);

  const load = () => api.list().then(({ data }) => setRows(data));

  useEffect(() => {
    load();
  }, [path]);

  const submit = async (event) => {
    event.preventDefault();
    await api.create(form);
    setForm(initial);
    load();
  };

  const remove = async (id) => {
    await api.remove(id);
    load();
  };

  return (
    <>
      <PageHeader title={title} subtitle={subtitle} />
      <Card variant="outlined">
        <CardContent>
          <Grid component="form" container spacing={2} onSubmit={submit}>
            {fields.map((field) => (
              <Grid key={field.name} size={{ xs: 12, sm: field.full ? 12 : 6, lg: field.full ? 12 : 3 }}>
                <TextField
                  fullWidth
                  select={Boolean(field.options)}
                  label={field.label}
                  type={field.type || "text"}
                  value={form[field.name]}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      [field.name]: field.type === "number" ? Number(e.target.value) : e.target.value
                    })
                  }
                  required={field.required !== false}
                >
                  {field.options?.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            ))}
            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
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
              <Stack alignItems="flex-start">
                <Button startIcon={<Add />} type="submit" variant="contained">
                  Add entry
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <TrackerTable rows={rows} columns={columns} onDelete={remove} />
    </>
  );
};

export default TrackerPage;
