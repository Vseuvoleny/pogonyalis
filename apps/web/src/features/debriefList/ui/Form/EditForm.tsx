import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import React, { FC } from "react";
import styles from "./styles.module.scss";
import { useDebriefData } from "@/features/model";
import { DebriefDto, useUpdateDebriefMutation } from "@/entities";
import { useQueryClient } from "@tanstack/react-query";
import { useDebriefModal } from "../../model";
import { debriefFormSchema, DebriefFormValues } from "../../model";

type Props = {
  cancel: () => void;
};

export const EditForm: FC<Props> = ({ cancel }) => {
  const debrief = useDebriefData((state) => state.debrief as DebriefDto);
  const debriefId = useDebriefData((state) => state.debriefId as string);
  const clearDebrief = useDebriefData((state) => state.clearDebrief);
  const closeModal = useDebriefModal((state) => state.closeModal);

  const mutation = useUpdateDebriefMutation();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<DebriefFormValues>({
    resolver: zodResolver(debriefFormSchema),
    defaultValues: {
      eventDate: debrief.eventDate,
      eventType: debrief.eventType,
      boatClass: debrief.boatClass,
      location: debrief.location,
      windFrom: debrief.windFrom,
      windTo: debrief.windTo,
      windUnit: debrief.windUnit,
      windGusts: debrief.windGusts,
      current: debrief.current,
      competitors: debrief.competitors,
      comment: debrief.comment,
      nextSteps: debrief.nextSteps,
    },
  });

  const onSubmit = (data: DebriefFormValues) => {
    console.log("Submitted data:", data);
    mutation.mutate(
      { body: data, id: debriefId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["debriefs"],
          });
          clearDebrief();
          closeModal();
        },
      },
    );
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container rowSpacing={2} columns={8}>
          <Grid container spacing={2} columns={8} size={8}>
            <Grid size={4} sx={{ alignItems: "center" }}>
              <Controller
                name="eventDate"
                control={control}
                render={({ field, fieldState }) => (
                  <DatePicker
                    label="Дата события"
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(date) =>
                      field.onChange(date?.format("YYYY-MM-DD") ?? "")
                    }
                    slotProps={{
                      textField: {
                        size: "small",
                        fullWidth: true,
                        error: !!fieldState.error,
                        helperText: fieldState.error?.message,
                      },
                    }}
                  />
                )}
              />
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
                  {...register("boatClass")}
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
                <span>Ветер (м/с)</span>
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <TextField
                    label="От"
                    type="number"
                    size="small"
                    sx={{ flex: 1 }}
                    {...register("windFrom", { valueAsNumber: true })}
                  />
                  <TextField
                    label="До"
                    type="number"
                    size="small"
                    sx={{ flex: 1 }}
                    error={!!errors.windTo}
                    helperText={errors.windTo?.message}
                    {...register("windTo", { valueAsNumber: true })}
                  />
                </Box>
                <Controller
                  name="windUnit"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup row {...field}>
                      <FormControlLabel
                        value="ms"
                        control={<Radio size="small" />}
                        label="м/с"
                      />
                      <FormControlLabel
                        value="knots"
                        control={<Radio size="small" />}
                        label="узлы"
                      />
                    </RadioGroup>
                  )}
                />
                <TextField
                  label="Порывы"
                  type="number"
                  size="small"
                  error={!!errors.windGusts}
                  helperText={errors.windGusts?.message}
                  {...register("windGusts", { valueAsNumber: true })}
                />
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
                  {...register("comment")}
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
