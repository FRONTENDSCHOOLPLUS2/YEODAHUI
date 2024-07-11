import { Image } from "./user";

interface LoginForm {
  email: string;
  password: string;
}

interface SignupForm {
  email: string;
  password: string;
  name: string;
  type?: string;
  image?: Image[];
}

export type { LoginForm, SignupForm };
