import {
    Html,
    Head,
    Font,
    Preview,
    Heading,
    Row,
    Section,
    Text,
    Button
} from '@react-email/components';

interface verificationEmailProps {
    username: string;
    otp: string;
}

export default function VerificationEmail({ username, otp }: verificationEmailProps) {
    return (
        <Html lang="en" dir="ltr">
            <Head>
                <title> Verification Code</title>
                <Font
                    fontFamily='Roboto'
                    fallbackFontFamily="Verdana"
                    webFont={{
                        url: 'https://fonts.gstatic.com/s/roboto/v27/KF0mCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
                        format: 'woff2',
                    }}
                    fontStyle='normal'
                    fontWeight={400}
                />
            </Head>
            <Preview>Here&apos;s your verification coed: {otp}</Preview>
            <Section>
                <Row>
                    <Heading as="h2">Hello {username}</Heading>
                </Row>
                <Row>
                    <Text>
                        Thank you for Registering. Please use the following verification code to complete your registration:
                    </Text>
                </Row>
                <Row>
                    <Text>
                        If you did not request this code, please ignore this email.
                    </Text>
                </Row>
            </Section>
        </Html>
    );
}