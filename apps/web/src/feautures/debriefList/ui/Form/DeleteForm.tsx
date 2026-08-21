import { useDeleteDebriefMutation } from "@/entities";
import { useDebriefData } from "@/feautures/model";
import { Box, Button } from "@mui/material";
import React, { FC } from "react";

type Props = {
  cancel: () => void;
};

export const DeleteForm: FC<Props> = ({ cancel }) => {
  const mutation = useDeleteDebriefMutation();
  const debriefId = useDebriefData((state) => state.debriefId as string);
  return (
    <Box sx={{ display: "flex", columnGap: "4px", mt: 1 }}>
      <Button
        type="submit"
        size="medium"
        color="error"
        variant="contained"
        onClick={() => {
          mutation.mutate(debriefId);
        }}
      >
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
