export const paths = {
  home: {
    getHref: () => '/',
  },
  auth: {
    signIn: {
      getHref: () => '/sign-in',
    },
    signUp: {
      getHref: () => '/sign-up',
    },
    forgotPassword: {
      getHref: () => '/forgot-password',
    },
  },
  dashboard: {
    app: {
      getHref: () => '/dashboard',
    },
  },
};
