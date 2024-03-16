// auth.ts (authentication utilities)

export const isAuthenticated = () => {
  // Check if the user is authenticated (e.g., check if token exists in local storage)
  // const token = localStorage.getItem('accessToken');
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('accessToken') : null;
  return !!token;
};

export const requireAuth = (context: any) => {
  if (!isAuthenticated()) {
    // Redirect to the login page if the user is not authenticated
    context.res.writeHead(302, { Location: '/login' });
    context.res.end();
  }
};
