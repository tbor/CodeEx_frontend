import React from 'react';
import { Page } from './Page';
import { useAuth } from './Auth';
type Props = {
    children?: React.ReactNode
 }
export const AuthorizedPage: React.FC<Props> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    if (isAuthenticated) {
        return <>{children}</>;
    } else {
        return (
            <Page title="You do not have access to this page">
            {null}
            </Page>
        );
    }
};