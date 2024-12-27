export const ErrorMessages = {
  User: {
    NameIsRequired: 'Name is required',
    NameIsLong: 'Name is too long',
    InvalidEmail: 'Invalid email format',
    PasswordIsShort: 'Password must be at least 6 characters long',
    PasswordIsLong: 'Password is too long',
    EmailAlreadyInUse: 'Email already in use',
    UserCreatedSuccessfully: 'User created successfully',
    UserNotFound: 'User not found. Please check your credentials.',
    InvalidCredentials: 'Invalid email or password.',
    SignInSuccessful: 'Sign-in successful.',
    Unauthorized: 'User is not authenticated.',
    Forbidden: 'You do not have the required permissions.',
    ForbiddenMerchantAccess: 'You must be a merchant to access this resource.',
    ForbiddenAdminAccess: 'You must be an admin to access this resource.',
  },
  Merchant: {
    NotFound: 'Merchant not found',
    NotAuthorized: 'Merchant is not authorized to create a restaurant',
  },
  Restaurant: {
    NotFound: 'Restaurant not found.',
  },
  MenuItem: {
    NotFound: 'Menu Item Not Found',
  },
  Cart: {
    CartAlreadyExists: 'Cart Already Exists',
    NotFound: 'Cart Not Found',
  },
  Server: {
    InternalServerError: 'Internal Server error',
  },
};
