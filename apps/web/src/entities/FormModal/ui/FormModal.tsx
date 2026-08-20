import { Box, Modal, Typography } from "@mui/material";
import { FC, ReactNode } from "react";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  title?: string;
  description?: string;
  renderForm?: () => ReactNode;
};

export const FormModal: FC<Props> = ({
  isOpen,
  closeModal,
  renderForm,
  title,
  description,
}) => {
  return (
    <Modal
      open={isOpen}
      className="form-modal"
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "fit-content",
          bgcolor: "background.paper",
          borderRadius: "8px",
          boxShadow: 24,
          p: 2,
        }}
      >
        {title && (
          <Typography id="modal-modal-title" variant="h6" component="h6">
            {title}
          </Typography>
        )}
        {description && (
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {description}
          </Typography>
        )}
        {renderForm?.()}
      </Box>
    </Modal>
  );
};
