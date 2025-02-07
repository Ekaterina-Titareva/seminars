export type TSeminar = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  photo: string;
};

export type TSeminars = TSeminar[];

export type TSeminarWithoutId = Omit<TSeminar, "id">;
