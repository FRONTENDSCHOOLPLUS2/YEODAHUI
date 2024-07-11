interface Image {
  originalname: string;
  name: string;
  path: string;
}

interface User {
  _id: string;
  email: string;
  name: string;
  phone?: string;
  address?: string;
  type: "user" | "admin";
  profileImage?: Image | null;
}

export type { User, Image };
