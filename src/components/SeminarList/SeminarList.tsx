import { FC, useEffect } from "react";
import { observer } from "mobx-react";

import store from "../../store/SeminarsStore";
import SeminarItem from "../SemenarItem/SeminarItem";
import LayoutLoading from "../../ui/LayoutLoading/LayoutLoading";

import styles from "./styles.module.css";

const SeminarList: FC = observer(() => {
  useEffect(() => {
    store.fetchSeminars();
  }, []);

  if (store.loading) {
    return <LayoutLoading />;
  }

  return (
    <section>
      <ul className={styles.listContainer}>
        {store.seminars.map((seminar) => (
          <SeminarItem key={seminar.id} seminar={seminar} />
        ))}
      </ul>
    </section>
  );
});

export default SeminarList;
