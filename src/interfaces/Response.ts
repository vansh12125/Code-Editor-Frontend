interface Response<T = unknown, E = string | null> {
  success: boolean;
  data: T |null;
  errors: E;
}

export type { Response };