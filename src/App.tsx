import { FC } from "react";
import { observer } from "mobx-react";
import SeminarList from "./components/SeminarList/SeminarList";
import { Toaster } from "react-hot-toast";

const App: FC = observer(() => {
  return (
    <main>
      <h1>Семинары</h1>
      <SeminarList />
      <Toaster />
    </main>
  );
});

export default App;
