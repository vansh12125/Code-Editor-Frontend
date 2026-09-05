interface Response<T = unknown, E = string | null> {
  success: boolean;
  data: T;
  errors: E;
}

export type { Response };