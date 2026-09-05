const validateLogin = (username: string, password: string) => {
  const errors: {
    username?: string;
    password?: string;
  } = {};

  if (!username.trim()) {
    errors.username = "Username cannot be empty";
  } else if (username.length < 3 || username.length > 25) {
    errors.username = "Username must be between 3 to 25 characters";
  } else if (!/^[a-zA-Z][a-zA-Z0-9_]{2,24}$/.test(username)) {
    errors.username =
      "Username must start with a letter and contain only letters, numbers, or underscores";
  }

  if (!password) {
    errors.password = "Password cannot be empty";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  return errors;
};

const validateRegister = (
  name: string,
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
  terms: boolean,
) => {
  const errors: {
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
  } = {};

  if (!name.trim()) {
    errors.name = "Name cannot be empty";
  } else if (name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  } else if (name.trim().length > 50) {
    errors.name = "Name cannot exceed 50 characters";
  }

  if (!username.trim()) {
    errors.username = "Username cannot be empty";
  } else if (username.length < 3 || username.length > 25) {
    errors.username = "Username must be between 3 to 25 characters";
  } else if (!/^[a-zA-Z][a-zA-Z0-9_]{2,24}$/.test(username)) {
    errors.username =
      "Username must start with a letter and contain only letters, numbers, or underscores";
  }

  if (!email.trim()) {
    errors.email = "Email cannot be empty";
  } else if (
    !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/.test(
      email,
    )
  ) {
    errors.email = "Please enter a valid email address";
  }

  if (!password) {
    errors.password = "Password cannot be empty";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  if (!confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  if (!terms) {
    errors.terms = "You must agree to the terms and privacy policy";
  }

  return errors;
};

export { validateLogin, validateRegister };
