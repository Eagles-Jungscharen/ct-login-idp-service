import { MessageBar, MessageBarBody, MessageBarTitle } from '@fluentui/react-components';
import { useState } from 'react';
import { LoginForm } from './components/LoginForm';
import { LoginLayout } from './components/LoginLayout';
import { appConfig } from './config/appConfig';
import { getAuthorizationRequestId, hasAuthorizationRequestId } from './utils/urlUtils';

const App: React.FunctionComponent = () => {
  const [authRequestId] = useState<string | null>(getAuthorizationRequestId());
  const [hasValidParam] = useState(hasAuthorizationRequestId());

  
  // Wenn der Parameter fehlt, zeige eine Fehlermeldung
  if (!hasValidParam || !authRequestId) {
    return (
      <LoginLayout
        title={appConfig.appTitle}
        description={appConfig.appDescription}
        backgroundImageUrl={appConfig.backgroundImageUrl}
      >
        <MessageBar intent="error">
          <MessageBarBody>
            <MessageBarTitle>Ungültiger Aufruf</MessageBarTitle>
            Diese Seite erfordert einen gültigen authorization_request_id Parameter in der URL.
          </MessageBarBody>
        </MessageBar>
      </LoginLayout>
    );
  }

  return (
    <LoginLayout
      title={appConfig.appTitle}
      description={appConfig.appDescription}
      backgroundImageUrl={appConfig.backgroundImageUrl}
    >
      <LoginForm authenticationRequestId={authRequestId} />
    </LoginLayout>
  );
}

export default App;
