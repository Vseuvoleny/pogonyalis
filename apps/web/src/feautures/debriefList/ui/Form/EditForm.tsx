import { Box, Button, ButtonGroup, Grid } from "@mui/material";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import styles from "./styles.module.scss";

type Props = {
  cancel: () => void;
};

export const EditForm: FC<Props> = ({ cancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      eventDate: "",
      eventType: "",
      boatClass: "",
      location: "",
      wind: "",
      current: "",
      competitors: "",
      comment: "",
      nextSteps: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Submitted data:", data);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} columns={8}>
          <Grid size={4}>
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
          </Grid>
          <Grid size={4}>
            <label className={styles.field}>
              <span>Тип события</span>
              <select {...register("eventType")}>
                <option value="training">Тренировка</option>
                <option value="training_race">Тренировочная гонка</option>
                <option value="race">Гонка</option>
              </select>
            </label>
          </Grid>
        </Grid>
        <Grid container spacing={2} columns={8}>
          <Grid size={4}>
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
          </Grid>
          <Grid size={4}>
            <label className={styles.field}>
              <span>Акватория</span>
              <input
                placeholder="Место тренировки или гонки"
                {...register("location")}
              />
            </label>
          </Grid>
        </Grid>
        <Grid container spacing={2} columns={8}>
          <Grid size={4}>
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
          </Grid>
          <Grid size={4}>
            <label className={styles.field}>
              <span>Условия течения</span>
              <input
                placeholder="Направление, сила, зоны влияния"
                {...register("current")}
              />
            </label>
          </Grid>
        </Grid>

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

        <Box sx={{ display: "flex", columnGap: "4px", mt: 1 }}>
          <Button type="submit" variant="contained" color="primary">
            Сохранить
          </Button>
          <Button
            type="button"
            variant="outlined"
            color="secondary"
            onClick={cancel}
          >
            Отменить
          </Button>
        </Box>
      </form>
    </Box>
  );
};
