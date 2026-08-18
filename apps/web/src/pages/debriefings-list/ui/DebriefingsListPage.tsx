"use client";

import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { Link } from "@mui/material";

export function DebriefingsListPage() {
  const [debrief, setDebrief] = useState([]);
  console.log(process.env);
  useEffect(() => {
    fetch("http://localhost:3333/debrief")
      .then((res) => {
        const result = res.json();
        return result;
      })
      .then((res) => {
        const mapped = res.data.map((e) => {
          return {
            id: e.id,
            date: e.eventDate,
            type: e.eventType,
            boatClass: e.boatClass,
            wind: e.wind,
            current: e.current,
            summary: e.comment,
          };
        });
        setDebrief(mapped);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="page-shell">
      <section className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>Журнал</p>
          <h1 className={styles.title}>Дебрифинги</h1>
        </div>
        <Link className={styles.createLink} href="/debriefings/new">
          Новая запись
        </Link>
      </section>

      <section className={styles.list} aria-label="Список дебрифингов">
        {debrief.map((debriefing) => (
          <article className={styles.card} key={debriefing.id}>
            <div className={styles.cardHeader}>
              <div>
                <p className={styles.date}>{debriefing.date}</p>
                <h2>{debriefing.type}</h2>
              </div>
              <span className={styles.boatClass}>{debriefing.boatClass}</span>
            </div>

            <dl className={styles.conditions}>
              <div>
                <dt>Ветер</dt>
                <dd>{debriefing.wind}</dd>
              </div>
              <div>
                <dt>Течение</dt>
                <dd>{debriefing.current}</dd>
              </div>
            </dl>

            <p className={styles.summary}>{debriefing.summary}</p>
            <Link href={`/debriefings/${debriefing.id}`} underline="none">
              К записи
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
