export const paths = {
  home: {
    getHref: () => '/',
  },
  privacy: {
    getHref: () => '/privacy',
  },
  terms: {
    getHref: () => '/terms',
  },
  faq: {
    getHref: () => '/faq',
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
    resetPassword: {
      getHref: () => '/reset-password',
    },
  },
  dashboard: {
    app: {
      getHref: () => '/dashboard',
    },
    jobs: {
      getHref: () => '/jobs',
    },
    resume: {
      getHref: () => '/resume',
    },
    settings: {
      getHref: () => '/settings',
    },
    profile: {
      getHref: () => '/profile',
    },
  },
};
