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
import { EventType, useCreateDebriefMutation } from "@/entities";
import { debriefFormSchema, DebriefFormValues } from "../../model";

const handleNumericChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  onChange: (value: number | null) => void,
) => {
  const cleaned = e.target.value.replace(/[^0-9]/g, "");
  onChange(cleaned === "" ? null : Number(cleaned));
};

type Props = {
  cancel: () => void;
  onSuccess?: () => void;
};

export const CreateForm: FC<Props> = ({ cancel, onSuccess }) => {
  const mutation = useCreateDebriefMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<DebriefFormValues>({
    resolver: zodResolver(debriefFormSchema),
    defaultValues: {
      eventDate: "",
      eventType: EventType.TRAINING,
      boatClass: "",
      location: "",
      windFrom: null,
      windTo: null,
      windUnit: "ms",
      windGusts: null,
      windDirection: null,
      windComment: "",
      current: "",
      competitors: "",
      comment: "",
      nextSteps: "",
    },
  });

  const onSubmit = (data: DebriefFormValues) => {
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
                <InputLabel sx={{ background: "#f5f7f4", p: "0 4px" }}>
                  Тип события
                </InputLabel>
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
                  <Controller
                    name="windFrom"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        label="От"
                        size="small"
                        sx={{ flex: 1 }}
                        value={field.value ?? ""}
                        onChange={(e) => handleNumericChange(e, field.onChange)}
                      />
                    )}
                  />
                  <Controller
                    name="windTo"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        label="До"
                        size="small"
                        sx={{ flex: 1 }}
                        value={field.value ?? ""}
                        onChange={(e) => handleNumericChange(e, field.onChange)}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                      />
                    )}
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
                <Controller
                  name="windGusts"
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      label="Порывы"
                      size="small"
                      value={field.value ?? ""}
                      onChange={(e) => handleNumericChange(e, field.onChange)}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
                <FormControl fullWidth size="small">
                  <InputLabel sx={{ background: "#f5f7f4", p: "0 4px" }}>
                    Направление ветра
                  </InputLabel>
                  <Select {...register("windDirection")}>
                    <MenuItem value="С">С (Север)</MenuItem>
                    <MenuItem value="СВ">СВ (Северо-Восток)</MenuItem>
                    <MenuItem value="В">В (Восток)</MenuItem>
                    <MenuItem value="ЮВ">ЮВ (Юго-Восток)</MenuItem>
                    <MenuItem value="Ю">Ю (Юг)</MenuItem>
                    <MenuItem value="ЮЗ">ЮЗ (Юго-Запад)</MenuItem>
                    <MenuItem value="З">З (Запад)</MenuItem>
                    <MenuItem value="СЗ">СЗ (Северо-Запад)</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Комментарий к ветру"
                  placeholder="Изменения ветра в течение дня, зоны, поведение"
                  multiline
                  rows={2}
                  {...register("windComment")}
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
