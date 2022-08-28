/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Header } from './header';
import { HomePage } from './HomePage';
import { fontFamily, fontSize, gray2 } from './Styles';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from './Store';

import { EventCreatePage } from './EventCreatePage';
import { SearchPage } from './SearchPage';
import { SignInPage } from './SignInPage';
import { NotFoundPage } from './NotFoundPage';
import { EventPage } from './EventPage';
import { SignOutPage } from './SignOutPage';

import { AuthProvider } from './Auth';
import { AuthorizedPage } from './AuthorizedPage';

const store = configureStore();
function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <div
            css={css`
              font-family: ${fontFamily};
              font-size: ${fontSize};
              color: ${gray2};
            `}
          >
            <Header />
            <Routes>
              <Route path="" element={<HomePage />} />
              <Route path="search" element={<SearchPage />} />
              <Route
                path="EventCreate"
                element={
                  <AuthorizedPage>
                    <EventCreatePage />
                  </AuthorizedPage>
                }
              />
              <Route path="signin" element={<SignInPage action="signin" />} />
              <Route
                path="/signin-callback"
                element={<SignInPage action="signin-callback" />}
              />
              <Route
                path="signout"
                element={<SignOutPage action="signout" />}
              />
              <Route
                path="/signout-callback"
                element={<SignOutPage action="signout-callback" />}
              />
              <Route path="events/:eventId" element={<EventPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  );
}

export default App;
