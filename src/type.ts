export type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export type PostWithoutId = Omit<Post, "id" | "userId">;
