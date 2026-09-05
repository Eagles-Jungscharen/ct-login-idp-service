import {
    Button,
    Field,
    Input,
    makeStyles,
    Spinner,
    tokens,
    type InputProps,
} from '@fluentui/react-components';
import { LockClosedRegular, PersonRegular } from '@fluentui/react-icons';
import { useState } from 'react';
import { login } from '../services/authService';
import { ErrorMessage } from './ErrorMessage';

const useStyles = makeStyles({
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacingVerticalL,
        width: '100%',
        maxWidth: '400px',
    },
    field: {
        display: 'flex',
        flexDirection: 'column',
    },
    submitButton: {
        marginTop: tokens.spacingVerticalM,
    },
    errorContainer: {
        marginTop: tokens.spacingVerticalM,
    },
});

interface LoginFormProps {
    authenticationRequestId: string;
}

/**
 * Login-Formular mit Benutzername und Passwort
 */
export const LoginForm: React.FunctionComponent<LoginFormProps> = (props: LoginFormProps) => {
    const { authenticationRequestId } = props;
    const styles = useStyles();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleUserNameChange: InputProps["onChange"] = (_e, data) => {
        setUsername(data.value);
    }

    const handlePasswordChange: InputProps["onChange"] = (_e, data) => {
        setPassword(data.value);
    }

    const handleSubmit = () => {
        setError('');

        // Client-seitige Validierung
        if (!username.trim()) {
            setError('Bitte geben Sie einen Benutzernamen oder eine E-Mail ein');
            return;
        }

        if (!password.trim()) {
            setError('Bitte geben Sie ein Passwort ein');
            return;
        }

        setIsLoading(true);

        login(username, password, authenticationRequestId).then(result => {
            ;

            if (!result.success) {
                setError(result.error || 'Login fehlgeschlagen');
                setIsLoading(false);
            }
            // Bei Erfolg wird der Browser automatisch weitergeleitet (302)
            // Daher keine weitere Aktion nötig
        }).catch(() => {
            setError('Ein unerwarteter Fehler ist aufgetreten');
            setIsLoading(false);
        });
    };

    return (
        <div className={styles.form}>
            <Field
                label="Benutzername / E-Mail"
                required
                className={styles.field}
            >
                <Input
                    contentBefore={<PersonRegular />}
                    type="text"
                    value={username}
                    onChange={handleUserNameChange}
                    disabled={isLoading}
                    placeholder="Ihr Benutzername / E-Mail"
                    autoComplete="username"
                />
            </Field>

            <Field
                label="Passwort"
                required
                className={styles.field}
            >
                <Input
                    contentBefore={<LockClosedRegular />}
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    disabled={isLoading}
                    placeholder="Ihr Passwort"
                    autoComplete="current-password"
                />
            </Field>

            <Button
                appearance="primary"
                disabled={isLoading}
                className={styles.submitButton}
                onClick={handleSubmit}
                icon={isLoading ? <Spinner size="tiny" /> : undefined}
            >
                {isLoading ? 'Anmeldung läuft...' : 'Anmelden'}
            </Button>

            {error && (
                <div className={styles.errorContainer}>
                    <ErrorMessage error={error} />
                </div>
            )}
        </div>
    );
}
