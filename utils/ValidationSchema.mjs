export const createUserValidationSchema = (users) => ({
  user_name: {
    notEmpty: {
      errorMessage: "User name cannot be empty",
    },
    isString: {
      errorMessage: "User name must be a string",
    },
    trim: true,
    isLength: {
      options: { min: 3, max: 12 },
      errorMessage: "User name should be between 3 and 12 characters",
    },
    custom: {
      options: (value) => {
        const existingUser = users.find(
          (user) => user.user_name.toLowerCase() === value.toLowerCase(),
        );

        if (existingUser) {
          throw new Error("User name Already exixts");
        }
        return true;
      },
    },
  },
  age: {
    notEmpty: {
      errorMessage: "Age cannot be empty",
    },
    isInt: {
      errorMessage: "Age must be an Integer",
    },
    toInt: true,
  },
});
