"use client";

import styles from "./styles.module.scss";
import { Box, Button, Container } from "@mui/material";
import { DebriefListContainer } from "@/feautures/debriefList";

export function DebriefingsListPage() {
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
          <DebriefListContainer />
        </section>
      </Container>
    </Box>
  );
}
