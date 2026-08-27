import { DebriefDto, Description } from "@/entities";
import React, { FC } from "react";
import styles from "./styles.module.scss";
import { TrainingName } from "@/shared";
import { Box, Button, Grid, Link } from "@mui/material";
import { useDebriefModal } from "../model";
import { useDebriefData } from "@/features/model";

type Props = {
  debriefs: DebriefDto[];
};

export const DebriefList: FC<Props> = ({ debriefs }) => {
  const openModal = useDebriefModal((state) => state.openModal);
  const setType = useDebriefModal((state) => state.setType);
  const setDebrief = useDebriefData((state) => state.setDebrief);

  const handlePatchClick = (debrief: DebriefDto) => {
    openModal();
    setType("edit");
    setDebrief(debrief);
    console.log("форма редактирования", debrief.id);
  };

  const handleDeleteClick = (debrief: DebriefDto) => {
    openModal();
    setType("delete");
    setDebrief(debrief);
    console.log("форма удаления", debrief.id);
  };

  return (
    <>
      {debriefs.map((debriefing) => (
        <article className={styles.card} key={debriefing.id}>
          <div className={styles.cardHeader}>
            <div>
              <p className={styles.date}>{debriefing.eventDate}</p>
              <h2>
                {
                  TrainingName[
                    debriefing.eventType as keyof typeof TrainingName
                  ]
                }
              </h2>
            </div>
            <span className={styles.boatClass}>{debriefing.boatClass}</span>
          </div>
          <dl className={styles.conditions}>
            <Grid size={2}>
              <Description desc={debriefing.wind} title="Ветер" />
            </Grid>
            <Grid size={2}>
              <Description desc={debriefing.current} title="Течение" />
            </Grid>
            <Grid size={2}>
              <Description desc={debriefing.location} title="Локация" />
            </Grid>
          </dl>
          <Box sx={{ mt: 1 }}>
            <Button size="small">
              <Link href={`/debriefings/${debriefing.id}`} underline="none">
                К записи
              </Link>
            </Button>
            <Button
              size="small"
              onClick={() => {
                handlePatchClick(debriefing);
              }}
            >
              Редактировать
            </Button>
            <Button
              size="small"
              onClick={() => {
                handleDeleteClick(debriefing);
              }}
            >
              Удалить
            </Button>
          </Box>
        </article>
      ))}
    </>
  );
};
