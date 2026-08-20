import { Box, Button, ButtonGroup } from "@mui/material";
import React, { FC } from "react";

type Props = {
  cancel: () => void;
};

export const DeleteForm: FC<Props> = ({ cancel }) => {
  return (
    <Box sx={{ display: "flex", columnGap: "4px", mt: 1 }}>
      <Button type="submit" size="medium" color="error" variant="contained">
        Удалить
      </Button>
      <Button
        size="medium"
        color="secondary"
        onClick={cancel}
        variant="contained"
      >
        Отменить
      </Button>
    </Box>
  );
};
