import React from "react";
 import { Stack, Typography } from "@mui/material";

const PageHeader = ({ title, subtitle, action }) => (
  <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" spacing={2}>
    <Stack spacing={0.5}>
      <Typography variant="h4">{title}</Typography>
      {subtitle && (
        <Typography color="text.secondary" sx={{ maxWidth: 720 }}>
          {subtitle}
        </Typography>
      )}
    </Stack>
    {action}
  </Stack>
);

export default PageHeader;
