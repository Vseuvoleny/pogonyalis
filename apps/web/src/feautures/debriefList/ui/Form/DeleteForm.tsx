import { useDeleteDebriefMutation } from "@/entities";
import { useDebriefData } from "@/feautures/model";
import { Box, Button } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import React, { FC } from "react";
import { useDebriefModal } from "../../model";

type Props = {
  cancel: () => void;
};

export const DeleteForm: FC<Props> = ({ cancel }) => {
  const mutation = useDeleteDebriefMutation();
  const debriefId = useDebriefData((state) => state.debriefId as string);
  const queryClient = useQueryClient();
  const closeModal = useDebriefModal((state) => state.closeModal);
  const clearDebrief = useDebriefData((state) => state.clearDebrief);

  return (
    <Box sx={{ display: "flex", columnGap: "4px", mt: 1 }}>
      <Button
        type="submit"
        size="medium"
        color="error"
        variant="contained"
        onClick={() => {
          mutation.mutate(debriefId, {
            onSuccess: () => {
              queryClient.invalidateQueries({
                queryKey: ["debriefs"],
              });
              clearDebrief();
              closeModal();
            },
          });
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
