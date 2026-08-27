"use client";

import { FC } from "react";
import styles from "./styles.module.scss";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import { Grid, Link, Skeleton, Typography } from "@mui/material";
import { TrainingName } from "@/shared";
import { debriefQuery, Description } from "@/entities";
import { useQuery } from "@tanstack/react-query";

type DebriefProps = {
  id: string;
};

export const Debrief: FC<DebriefProps> = ({ id }: { id: string }) => {
  const { data: debrief, isPending, isError } = useQuery(debriefQuery(id));

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
    <Container>
      <Box sx={{ p: 2 }}>
        <Card variant="outlined">
          <CardContent className={styles.card} key={debrief.id}>
            <Box sx={{ pb: 2 }}>
              <Link href="/debriefings" underline="none">
                Назад
              </Link>
            </Box>

            <div className={styles.cardHeader}>
              <div>
                <p className={styles.date}>{debrief.eventDate}</p>
                <h2>
                  {
                    TrainingName[
                      debrief.eventType as keyof typeof TrainingName
                    ]
                  }
                </h2>
              </div>
              <span className={styles.boatClass}>{debrief.boatClass}</span>
            </div>

            <dl className={styles.conditions}>
              <Description desc={debrief.wind} title="Ветер" />
              <Description desc={debrief.location} title="Локация" />
              <Description desc={debrief.current} title="Течение" />
              <Description desc={debrief.competitors} title="Соперники" />
            </dl>
            <Box sx={{ pt: 2 }}>
              <Grid container spacing={2} columns={8}>
                <Grid size={4}>
                  <Box>
                    <Typography variant="h6">Комментарий</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {debrief.comment}
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={4}>
                  <div>
                    <Typography variant="h6">Пожелания</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {debrief.nextSteps}
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};
