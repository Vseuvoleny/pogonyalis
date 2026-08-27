import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import {
  DebriefBody,
  EventType,
  useCreateDebriefMutation,
} from "@/entities";

type Props = {
  cancel: () => void;
  onSuccess?: () => void;
};

export const CreateForm: FC<Props> = ({ cancel, onSuccess }) => {
  const mutation = useCreateDebriefMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DebriefBody>({
    defaultValues: {
      eventDate: "",
      eventType: EventType.TRAINING,
      boatClass: "",
      location: "",
      wind: "",
      current: "",
      competitors: "",
      comment: "",
      nextSteps: "",
    },
  });

  const onSubmit = (data: DebriefBody) => {
    mutation.mutate(data, {
      onSuccess: () => {
        onSuccess?.();
      },
    });
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container rowSpacing={2} columns={8}>
          <Grid container spacing={2} columns={8} size={8}>
            <Grid size={4} sx={{ alignItems: "center" }}>
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
              <FormControl className={styles.field} fullWidth size="small">
                <InputLabel>Тип события</InputLabel>
                <Select {...register("eventType")}>
                  <MenuItem value="training">Тренировка</MenuItem>
                  <MenuItem value="training_race">Тренировочная гонка</MenuItem>
                  <MenuItem value="race">Гонка</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={2} columns={8} size={8}>
            <Grid size={4}>
              <label className={styles.field}>
                <TextField
                  label="Класс яхты"
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
                <TextField
                  label="Акватория"
                  placeholder="Место тренировки или гонки"
                  {...register("location")}
                />
              </label>
            </Grid>
          </Grid>
          <Grid container spacing={2} columns={8} size={8}>
            <Grid size={4}>
              <label className={styles.field}>
                <TextField
                  label="Ветровые условия"
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
                <TextField
                  label="Условия течения"
                  placeholder="Направление, сила, зоны влияния"
                  {...register("current")}
                />
              </label>
            </Grid>
          </Grid>

          <Grid container rowSpacing={2} columns={8} size={8}>
            <Grid size={8}>
              <label className={styles.field}>
                <TextField
                  label="Соперники"
                  multiline
                  placeholder="Кто был на воде, сильные и слабые стороны соперников"
                  rows={4}
                  {...register("competitors")}
                />
              </label>
            </Grid>
            <Grid size={8}>
              <label className={styles.field}>
                <TextField
                  label="Комментарий о событии"
                  multiline
                  placeholder="Что происходило, какие решения сработали, что стоит повторить"
                  rows={6}
                  {...register("comment", {
                    required: "Добавь комментарий о событии",
                  })}
                />
                {errors.comment ? (
                  <small>{errors.comment.message}</small>
                ) : null}
              </label>
            </Grid>
            <Grid size={8}>
              <label className={styles.field}>
                <TextField
                  label="Выводы на следующий выход"
                  multiline
                  placeholder="1-3 конкретных действия для следующей тренировки"
                  rows={4}
                  {...register("nextSteps")}
                />
              </label>
            </Grid>
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", columnGap: "4px", mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={mutation.isPending}
          >
            Сохранить запись
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
