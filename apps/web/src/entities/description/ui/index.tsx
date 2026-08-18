import Box from "@mui/material/Box";
import React from "react";

interface DescriptionProps {
  title?: string;
  desc?: string;
}

export const Description = ({ title, desc }: DescriptionProps) => {
  return (
    <Box>
      {title && <dt>{title}</dt>}
      {desc && <dd>{desc}</dd>}
    </Box>
  );
};
