"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import { useCreateDebriefMutation } from "@/entities";
import { Button } from "@mui/material";

type DebriefFormValues = {
  eventDate: string;
  eventType: "training" | "race" | "training_race";
  boatClass: string;
  location: string;
  wind: string;
  current: string;
  competitors: string;
  comment: string;
  nextSteps: string;
};

export function NewDebriefPage() {
  const mutation = useCreateDebriefMutation();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<DebriefFormValues>({
    defaultValues: {
      eventType: "training",
    },
  });

  const onSubmit = (data: DebriefFormValues) => {
    mutation.mutate(data, {
      onSuccess: () => {
        alert("Запрос выполнен успешно");
      },
    });
  };

  return (
    <div className="page-shell">
      <main className={styles.page}>
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

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.grid}>
            <label className={styles.field}>
              <span>Дата события</span>
              <input
                type="date"
                {...register("eventDate", {
                  required: "Укажи дату события",
                })}
              />
              {errors.eventDate ? (
                <small>{errors.eventDate.message}</small>
              ) : null}
            </label>

            <label className={styles.field}>
              <span>Тип события</span>
              <select {...register("eventType")}>
                <option value="training">Тренировка</option>
                <option value="training_race">Тренировочная гонка</option>
                <option value="race">Гонка</option>
              </select>
            </label>

            <label className={styles.field}>
              <span>Класс яхты</span>
              <input
                placeholder="Например, J/70"
                {...register("boatClass", {
                  required: "Укажи класс яхты",
                })}
              />
              {errors.boatClass ? (
                <small>{errors.boatClass.message}</small>
              ) : null}
            </label>

            <label className={styles.field}>
              <span>Акватория</span>
              <input
                placeholder="Место тренировки или гонки"
                {...register("location")}
              />
            </label>

            <label className={styles.field}>
              <span>Ветровые условия</span>
              <input
                placeholder="Направление, сила, порывы"
                {...register("wind", {
                  required: "Опиши ветровые условия",
                })}
              />
              {errors.wind ? <small>{errors.wind.message}</small> : null}
            </label>
            <label className={styles.field}>
              <span>Условия течения</span>
              <input
                placeholder="Направление, сила, зоны влияния"
                {...register("current")}
              />
            </label>
          </div>

          <label className={styles.field}>
            <span>Соперники</span>
            <textarea
              placeholder="Кто был на воде, сильные и слабые стороны соперников"
              rows={4}
              {...register("competitors")}
            />
          </label>

          <label className={styles.field}>
            <span>Комментарий о событии</span>
            <textarea
              placeholder="Что происходило, какие решения сработали, что стоит повторить"
              rows={6}
              {...register("comment", {
                required: "Добавь комментарий о событии",
              })}
            />
            {errors.comment ? <small>{errors.comment.message}</small> : null}
          </label>

          <label className={styles.field}>
            <span>Выводы на следующий выход</span>
            <textarea
              placeholder="1-3 конкретных действия для следующей тренировки"
              rows={4}
              {...register("nextSteps")}
            />
          </label>

          <div className={styles.actions}>
            <Button
              variant="contained"
              size="medium"
              color="primary"
              disabled={mutation.isPending}
              type="submit"
              loading={mutation.isPending}
              loadingPosition="end"
            >
              Сохранить запись
            </Button>
            <Button
              href="/debriefings"
              variant="contained"
              size="medium"
              color="secondary"
            >
              Отмена
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
