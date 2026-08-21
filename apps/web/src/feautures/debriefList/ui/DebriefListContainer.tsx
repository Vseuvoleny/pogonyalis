"use client";

import { allDebriefQuery, FormModal } from "@/entities";
import { Box, Container, Modal, Skeleton, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { FC } from "react";

import { DebriefList } from "./DebriefList";
import { useDebriefModal } from "../model";
import { FormDictionary } from "./Form";

export const DebriefListContainer: FC = () => {
  const { data, isPending, isError } = useQuery(allDebriefQuery());
  const isOpen = useDebriefModal((state) => state.isOpen);
  const closeModal = useDebriefModal((state) => state.closeModal);
  const type = useDebriefModal((state) => state.type);

  if (isPending) {
    return (
      <Container>
        <Box sx={{ p: 2 }}>
          <Skeleton variant="rectangular" width={650} height={315} />
        </Box>
      </Container>
    );
  }

  if (isError) {
    return <div>Произошла ошибка</div>;
  }

  return (
    <>
      <DebriefList debriefs={data} />
      <FormModal
        isOpen={isOpen}
        closeModal={closeModal}
        title={
          type === "edit"
            ? "Редактирование записи"
            : "Вы действительно хотите удалить запись?"
        }
        $width={type === "edit" ? "800px" : undefined}
        renderForm={() => {
          const FormComponent =
            FormDictionary[type as keyof typeof FormDictionary];
          return <FormComponent cancel={closeModal} />;
        }}
      />
    </>
  );
};
