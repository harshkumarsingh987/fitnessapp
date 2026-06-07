import React from "react";
 import { Card, CardContent, LinearProgress, Stack, Typography } from "@mui/material";

const MetricCard = ({ title, value, helper, progress, icon }) => (
  <Card variant="outlined">
    <CardContent>
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
        <Stack spacing={0.5}>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="h5">{value}</Typography>
          {helper && (
            <Typography variant="caption" color="text.secondary">
              {helper}
            </Typography>
          )}
        </Stack>
        {icon}
      </Stack>
      {progress !== undefined && (
        <LinearProgress
          variant="determinate"
          value={Math.min(Number(progress) || 0, 100)}
          sx={{ mt: 2, height: 8, borderRadius: 1 }}
        />
      )}
    </CardContent>
  </Card>
);

export default MetricCard;
