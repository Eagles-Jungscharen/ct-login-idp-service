import { MessageBar, MessageBarBody, MessageBarTitle } from '@fluentui/react-components';

interface ErrorMessageProps {
  error: string;
}

/**
 * Komponente zur Anzeige von Fehlermeldungen
 */
export const ErrorMessage: React.FunctionComponent<ErrorMessageProps> = (props: ErrorMessageProps) => {
  const { error } = props;
  if (!error) {
    return null;
  }

  return (
    <MessageBar intent="error">
      <MessageBarBody>
        <MessageBarTitle>Fehler</MessageBarTitle>
        {error}
      </MessageBarBody>
    </MessageBar>
  );
}
