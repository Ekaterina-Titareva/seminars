import { FC } from "react";
import { observer } from "mobx-react";
import { FieldErrors, FormProvider, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import store from "../../store/SeminarsStore";
import { TSeminar, TSeminarWithoutId } from "../../types/types";
import { validationSchema } from "../../utils/validationSchema";
import { convertDateFormatToInput } from "../../utils/convertDateFormatToInput";

import Button from "../../ui/Button/Button";
import Input from "../Input/Input";

import styles from "./styles.module.css";

const EditForm: FC<{
  seminar: TSeminar;
  onClose: () => void;
}> = observer(({ seminar, onClose }) => {
  const formValidationSchema = z.object({
    title: validationSchema.titleSchema,
    description: validationSchema.descriptionSchema,
    date: validationSchema.dateSchema,
    time: validationSchema.timeSchema,
    photo: validationSchema.photoSchema,
  });

  const formMethods = useForm({
    resolver: zodResolver(formValidationSchema),
    mode: "onChange",
    defaultValues: {
      title: seminar.title || "",
      description: seminar.description || "",
      date: convertDateFormatToInput(seminar.date) || "",
      time: seminar.time || "",
      photo: seminar.photo || "",
    },
  });

  const { handleSubmit, register, formState, reset } = formMethods;
  const { errors } = formState;

  const typedErrors = errors as FieldErrors<Record<string, any>>;
  const onSubmit = async (data: TSeminarWithoutId) => {
    await store.updateSeminar({
      id: seminar.id,
      ...data,
    });
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };
  return (
    <div className={styles.wrapper}>
      <h4 className={styles.title}>Редактировать семинар</h4>
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formItem}>
            <label>Название:</label>
            <Input name="title" type="text" />
            {typeof typedErrors?.title?.message === "string" && (
              <p className={styles.error}>{typedErrors.title.message}</p>
            )}
          </div>
          <div className={styles.formItem}>
            <label>Описание:</label>
            <textarea {...register("description")} />
            {typeof typedErrors?.description?.message === "string" && (
              <p className={styles.error}>{typedErrors.description.message}</p>
            )}
          </div>
          <div className={styles.formItem}>
            <label>Дата:</label>
            <Input name="date" type="date" />
            {typeof typedErrors?.date?.message === "string" && (
              <p className={styles.error}>{typedErrors.date.message}</p>
            )}
          </div>
          <div className={styles.formItem}>
            <label>Время:</label>
            <Input name="time" type="time" />
            {typeof typedErrors?.time?.message === "string" && (
              <p className={styles.error}>{typedErrors.time.message}</p>
            )}
          </div>
          <div className={styles.formItem}>
            <label>Ссылка на фото:</label>
            <Input name="photo" type="url" />
            {typeof typedErrors?.photo?.message === "string" && (
              <p className={styles.error}>{typedErrors.photo.message}</p>
            )}
          </div>
          <Button variant="contained" type="submit">
            <Button.Text text="Сохранить изменения" />
          </Button>
          <Button variant="outlined" type="button" onClick={handleClose}>
            <Button.Text text="Закрыть" />
          </Button>
          <DevTool control={formMethods.control} />
        </form>
      </FormProvider>
    </div>
  );
});

export default EditForm;
