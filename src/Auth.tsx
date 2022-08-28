import React from 'react';
import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { authSettings } from './AppSettings';
import { postUser } from './EventData';

interface Auth0User {
  sub?: string;
  name?: string;
  email?: string;
  isCoordinator?: boolean;
}
interface IAuth0Context {
  isAuthenticated: boolean;
  isCoordinator: boolean;
  user?: Auth0User;
  signIn: () => void;
  signOut: () => void;
  loading: boolean;
}

export const Auth0Context = React.createContext<IAuth0Context>({
  isAuthenticated: false,
  isCoordinator: false,
  signIn: () => {},
  signOut: () => {},
  loading: true,
});

// custom hook providing a function for components to get access to the state and functions in the authentication context
export const useAuth = () => React.useContext(Auth0Context);

type Props = {
  children?: React.ReactNode;
};

// provider component for the context
export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
  const [isCoordinator, setIsCoordinator] = React.useState<boolean>(false);

  const [user, setUser] = React.useState<Auth0User | undefined>(undefined);
  const [auth0Client, setAuth0Client] = React.useState<Auth0Client>();
  const [loading, setLoading] = React.useState<boolean>(true);

  // useEffect Hook creates instance of the Auth0 client and sets state values.
  React.useEffect(() => {
    const initAuth0 = async () => {
      setLoading(true);
      const auth0FromHook = await createAuth0Client(authSettings);

      setAuth0Client(auth0FromHook);

      //handles sign-in callback when the provider loads
      if (
        window.location.pathname === '/signin-callback' &&
        window.location.search.indexOf('code=') > -1
      ) {
        await auth0FromHook.handleRedirectCallback(); // parses the URL, extracts the code, and stores it in a variable internally
        window.location.replace(window.location.origin);
      }

      const isAuthenticatedFromHook = await auth0FromHook.isAuthenticated();
      if (isAuthenticatedFromHook) {
        const user = await auth0FromHook.getUser();
        setUser(user);

        if (
          (user!['CodeEx_DSE.Microsoft.com/isCoordinator'] !== undefined &&
            user!['CodeEx_DSE.Microsoft.com/isCoordinator']) ||
          (user?.nickname !== undefined &&
            (user?.nickname.toUpperCase() === 'TRUE' ||
              user?.nickname.toUpperCase() === 'YES' ||
              user?.nickname.toUpperCase() === 'Y'))
        ) {
          setIsCoordinator(true);
        }

        const result = await postUser({
          userId:
            user?.sub === null || user?.sub === undefined ? '' : user?.sub,
          userName:
            user?.name === null || user?.name === undefined ? '' : user?.name,
          userEmail:
            user?.email === null || user?.email === undefined
              ? ''
              : user?.email,
          isCoordinator:
            user === null || user === undefined
              ? false
              : user!['CodeEx_DSE.Microsoft.com/isCoordinator'] ||
                (user?.nickname !== undefined &&
                  (user?.nickname.toUpperCase() === 'TRUE' ||
                    user?.nickname.toUpperCase() === 'YES' ||
                    user?.nickname.toUpperCase() === 'Y')),
        });
      }
      setIsAuthenticated(isAuthenticatedFromHook);
      setLoading(false);
    };
    initAuth0();
  }, []);

  //returns the Auth0 client from the state
  const getAuth0ClientFromState = () => {
    if (auth0Client === undefined) {
      throw new Error('Auth0 client not set');
    }
    return auth0Client;
  };
  // Returns the context's Provider component from React.
  // The object passed in the value property will be available to consumers of the context.
  // Consumers of the context can access user profile, whether user is authenticated, and functions for signing in and out.
  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        isCoordinator,
        user,
        signIn: () => getAuth0ClientFromState().loginWithRedirect(),
        signOut: () =>
          getAuth0ClientFromState().logout({
            client_id: authSettings.client_id,
            returnTo: window.location.origin + '/signout-callback',
          }),
        loading,
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};

// Function to get the access token
export const getAccessToken = async () => {
  const auth0FromHook = await createAuth0Client(authSettings);
  const accessToken = await auth0FromHook.getTokenSilently(); // makes a request to the Auth0 token endpoint to get the access token securely
  return accessToken;
};
