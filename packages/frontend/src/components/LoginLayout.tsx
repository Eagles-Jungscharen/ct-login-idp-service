import { type ReactNode } from 'react';
import { makeStyles, tokens, Title1, Body1, Card } from '@fluentui/react-components';

const useStyles = makeStyles({
    container: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: tokens.spacingHorizontalXXL,
        position: 'relative',
        overflow: 'hidden',
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: 0,
    },
    backgroundGradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `linear-gradient(135deg, ${tokens.colorBrandBackground} 0%, ${tokens.colorBrandBackground2} 100%)`,
        zIndex: 0,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        zIndex: 1,
    },
    card: {
        position: 'relative',
        zIndex: 2,
        padding: tokens.spacingHorizontalXXXL,
        maxWidth: '500px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: tokens.spacingVerticalXL,
        boxShadow: tokens.shadow64,
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: tokens.spacingVerticalM,
        textAlign: 'center',
        width: '100%',
    },
    title: {
        color: tokens.colorNeutralForeground1,
    },
    description: {
        color: tokens.colorNeutralForeground2,
    },
    content: {
        width: '100%',
    },
});

interface LoginLayoutProps {
    title: string;
    description: string;
    backgroundImageUrl?: string;
    children: ReactNode;
}

/**
 * Layout-Komponente für die Login-Seite mit optionalem Hintergrundbild
 */
export const LoginLayout: React.FunctionComponent<LoginLayoutProps> = (props: LoginLayoutProps) => {
    const { title, description, backgroundImageUrl, children } = props;
    const styles = useStyles();

    return (
        <div className={styles.container}>
            {/* Hintergrundbild oder Gradient */}
            {backgroundImageUrl ? (
                <>
                    <div
                        className={styles.backgroundImage}
                        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
                    />
                    <div className={styles.overlay} />
                </>
            ) : (
                <div className={styles.backgroundGradient} />
            )}

            {/* Login-Card */}
            <Card className={styles.card}>
                <div className={styles.header}>
                    <Title1 className={styles.title}>{title}</Title1>
                    <Body1 className={styles.description}>{description}</Body1>
                </div>
                <div className={styles.content}>{children}</div>
            </Card>
        </div>
    );
}
