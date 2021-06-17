import CreateUserInput from '../resolvers/CreateUserInput';

export const validateRegisteredUser = (options: CreateUserInput) => {
  if (options.email.length === 0) {
    return [
      {
        field: 'email',
        message: 'Email cannot be empty',
      },
    ];
  }
  if (!options.email.match(/^\S+@\S+$/)) {
    return [
      {
        field: 'email',
        message: 'Not a valid email address',
      },
    ];
  }

  if (options.password.length <= 6) {
    return [
      {
        field: 'password',
        message: 'Password cannot be less that 6 characters',
      },
    ];
  }

  return null;
};
