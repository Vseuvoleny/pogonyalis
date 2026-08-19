"use client";

import styles from "./styles.module.scss";
import { Box, Button, Container, Grid, Link, Skeleton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import {
  allDebriefQuery,
  Description,
  useDeleteDebriefMutation,
} from "@/entities";
import { Training_Name } from "@/shared";

export function DebriefingsListPage() {
  const { data, isPending, isError } = useQuery(allDebriefQuery());
  const mutation = useDeleteDebriefMutation();

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
    <Box sx={{ mt: 4 }}>
      <Container className="page-shell">
        <section className={styles.heading}>
          <div>
            <p className={styles.eyebrow}>Журнал</p>
            <h1 className={styles.title}>Дебрифинги</h1>
          </div>
          <Button href="/debriefings/new" variant="outlined">
            Новая запись
          </Button>
        </section>

        <section className={styles.list} aria-label="Список дебрифингов">
          {data.map((debriefing) => (
            <article className={styles.card} key={debriefing.id}>
              <div className={styles.cardHeader}>
                <div>
                  <p className={styles.date}>{debriefing.eventDate}</p>
                  <h2>
                    {
                      Training_Name[
                        debriefing.eventType as keyof typeof Training_Name
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
                    console.log("форма редактирования");
                  }}
                >
                  Редактировать
                </Button>
                <Button
                  size="small"
                  onClick={() => {
                    mutation.mutate(debriefing.id);
                  }}
                >
                  Удалить
                </Button>
              </Box>
            </article>
          ))}
        </section>
      </Container>
    </Box>
  );
}
