"use client";

import Link from "next/link";
import { Footer } from "@/fsd/widgets/footer";
import { Header } from "@/fsd/widgets/header";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";

const debriefings = [
  {
    id: "1",
    date: "2026-07-12",
    type: "Тренировка",
    boatClass: "J/70",
    wind: "8-12 узлов, правый заход к концу сессии",
    current: "Слабое течение вдоль линии старта",
    summary:
      "Хорошие старты с пина, нужно точнее держать layline на верхнем знаке.",
  },
  {
    id: "2",
    date: "2026-07-06",
    type: "Гонка",
    boatClass: "SB20",
    wind: "14-18 узлов, порывисто",
    current: "Заметный снос на лавировке",
    summary:
      "Потеряли темп после второго поворота, но хорошо отыграли на фордевинде.",
  },
];

export function DebriefingsListPage() {
  const [debrief, setDebrief] = useState(debriefings);

  useEffect(() => {
    const mergeLocalStorageDebriefings = () => {
      const localStorageDebriefings = localStorage.getItem("debriefData");
      if (localStorageDebriefings) {
        const parsedDebriefings = JSON.parse(localStorageDebriefings);
        console.log(parsedDebriefings);

        const mergedDebriefings = [parsedDebriefings, ...debriefings];
        setDebrief(mergedDebriefings);
      }
    };
    mergeLocalStorageDebriefings();
  }, []);

  return (
    <div className="page-shell">
      <Header />

      <main className={styles.page}>
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
            </article>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}
