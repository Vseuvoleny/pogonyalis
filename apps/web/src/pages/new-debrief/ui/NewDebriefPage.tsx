"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./styles.module.scss";
import { CreateForm } from "@/features/debriefList";

export function NewDebriefPage() {
  const router = useRouter();

  return (
    <div className={styles.page}>
        <section className={styles.heading}>
          <Link className={styles.backLink} href="/debriefings">
            Назад к списку
          </Link>
          <h1>Новая запись</h1>
          <p>
            Зафиксируй условия, соперников и основные выводы сразу после выхода
            на воду.
          </p>
        </section>

        <CreateForm
          cancel={() => router.push("/debriefings")}
          onSuccess={() => router.push("/debriefings")}
        />
    </div>
  );
}
