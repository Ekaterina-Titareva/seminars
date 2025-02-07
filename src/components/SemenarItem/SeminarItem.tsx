import { FC, useState } from "react";
import { observer } from "mobx-react";
import toast from "react-hot-toast";

import { TSeminar } from "../../types/types";
import { convertDateFormatToDisplay } from "../../utils/convertDateFormatToDisplay";
import store from "../../store/SeminarsStore";
import EditForm from "../EditForm/EditForm";
import Popup from "../Popup/Popup";
import Button from "../../ui/Button/Button";

import styles from "./styles.module.css";

const SeminarItem: FC<{ seminar: TSeminar }> = observer(({ seminar }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    toast(
      (t) => (
        <div className={styles.notification}>
          <p>Вы уверены, что хотите удалить этот семинар?</p>
          <div className={styles.btnsContainer}>
            <Button
              type="button"
              variant="contained"
              onClick={() => {
                try {
                  store.deleteSeminar(seminar.id);
                  toast.dismiss(t.id);
                  toast.success("Семинар успешно удалён!");
                } catch {
                  toast.dismiss(t.id);
                  toast.error("Ошибка при удалении семинара.");
                }
              }}
            >
              <Button.Text text="Удалить" />
            </Button>
            <Button
              type="button"
              variant="outlined"
              onClick={() => toast.dismiss(t.id)}
            >
              <Button.Text text="Отменить" />
            </Button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
      }
    );
  };

  const handleClosePopup = () => {
    setIsEditing(false);
  };

  return (
    <>
      <li className={styles.listItemContainer}>
        <h5 className={styles.listItemTitle}>{seminar.title}</h5>
        <div className={styles.listItemMediaContainer}>
          <img src={seminar.photo} alt={seminar.title} />
        </div>
        <p>{seminar.description}</p>
        <h6 className={styles.listItemDate}>
          {convertDateFormatToDisplay(seminar.date)} в {seminar.time}
        </h6>
        <Button
          type="button"
          variant="contained"
          onClick={() => setIsEditing(true)}
        >
          <Button.Text text="Редактировать" />
        </Button>
        <Button type="button" variant="outlined" onClick={handleDelete}>
          <Button.Text text="Удалить" />
        </Button>
        <Popup onClose={handleClosePopup} isOpen={isEditing}>
          <EditForm onClose={handleClosePopup} seminar={seminar} />
        </Popup>
      </li>
    </>
  );
});

export default SeminarItem;
