import { makeAutoObservable } from "mobx";
import {
  deleteSeminarFromAPI,
  fetchSeminarsFromAPI,
  updateSeminarInAPI,
} from "../api/api";
import { TSeminar, TSeminars } from "../types/types";

const seminarsStore = () => {
  return {
    seminars: <TSeminars>[],
    loading: false,

    fetchSeminars: async function () {
      this.loading = true;
      try {
        this.seminars = await fetchSeminarsFromAPI();
      } catch (error) {
        console.error("Failed to fetch seminars:", error);
      } finally {
        this.loading = false;
      }
    },

    deleteSeminar: async function (id: string) {
      try {
        await deleteSeminarFromAPI(id);
        this.seminars = this.seminars.filter((seminar) => seminar.id !== id);
      } catch (error) {
        console.error("Failed to delete seminar:", error);
      }
    },

    updateSeminar: async function (updatedSeminar: TSeminar) {
      try {
        const data = await updateSeminarInAPI(updatedSeminar);
        const index = this.seminars.findIndex(
          (seminar) => seminar.id === data.id
        );
        if (index !== -1) {
          this.seminars[index] = data;
        }
      } catch (error) {
        console.error("Failed to update seminar:", error);
      }
    },
  };
};

const store = seminarsStore();
makeAutoObservable(store);

export default store;
