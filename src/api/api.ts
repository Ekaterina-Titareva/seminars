import { TSeminar } from "../types/types";
import notify from "../utils/notify";

const url = "http://localhost:5000";

export const fetchSeminarsFromAPI = async () => {
  const response = await fetch(`${url}/seminars`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const deleteSeminarFromAPI = async (id: string) => {
  const response = await fetch(`${url}/seminars/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete seminar");
  }
};

export const updateSeminarInAPI = async (updatedSeminar: TSeminar) => {
  try {
    const response = await fetch(`${url}/seminars/${updatedSeminar.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedSeminar),
    });

    if (!response.ok) {
      notify("Произошла ошибка при обновлении семинара", "error");
      throw new Error(`Failed to update seminar: ${response.statusText}`);
    }

    notify("Семинар успешно обновлен", "success");
    return response.json();
  } catch (error) {
    console.error(error);
    notify("Произошла ошибка при обновлении семинара", "error");
    throw error;
  }
};
