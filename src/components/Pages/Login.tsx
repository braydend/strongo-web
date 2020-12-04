import firebase from '../../utils/firebase';
import React, { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useFormValidation } from '../../hooks/useFormValidation';
import validateLogin from '../../utils/validators/validateLogin';
import { UserProvider } from '../Context/UserContext';

// const Container = styled.div`

// `;

// const Login = () => {
//     return (
//         <Container>
//             <UserProvider>
//                 <Form>
//                     <Form.Group controlId="email">
//                         <Form.Label>Email</Form.Label>
//                         <Form.Control type="email" placeholder="Enter email" />
//                     </Form.Group>

//                     <Form.Group controlId="password">
//                         <Form.Label>Password</Form.Label>
//                         <Form.Control type="password" placeholder="Password" />
//                     </Form.Group>
//                     <Button variant="primary" type="submit">
//                         Login
//                     </Button>
//                 </Form>
//             </UserProvider>
//         </Container>
//     );
// };

// export { Login, Login as default };

type Props = {
    show: boolean;
    onClose: () => void;
};

type FormType = {
    email: string,
    password: string,
};

const INITIAL_STATE: FormType = {
    email: '',
    password: '',
};

const LoginPage: React.FC<Props> = ({ show, onClose }) => {
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState<string>();

    const authenticateUser = async () => {
        setBusy(true);
        setError(undefined);
        const { email, password } = values;

        try {
            await firebase.login(email, password);
            handleClose();
        } catch (e) {
            console.error("Authentication error", e);
            setError(e.message);
        }
        setBusy(false);
    };

    const { handleSubmit, handleChange, values, isSubmitting, setValues, errors } = useFormValidation<FormType>(INITIAL_STATE, validateLogin, authenticateUser);

    const handleClose = () => {
        setValues(INITIAL_STATE);
        onClose();
    };

    const hasErrors = Object.keys(errors).length > 0 || error;

    return (
        <>
            {hasErrors && <Alert variant='danger'>{[...Object.values(errors), error].join(' ')}</Alert>}
            <Form>
                <Form.Group>
                    <Form.Label htmlFor='email'>
                        Email
                    </Form.Label>
                    <Form.Control id='email' type="email" placeholder="enter@your.email" value={values.email} onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor='password'>
                        Password
                    </Form.Label>
                    <Form.Control id='password' type="password" placeholder="Secret sauce" value={values.password} onChange={handleChange} />
                </Form.Group>
                <Button onClick={handleSubmit} disabled={isSubmitting}>
                    Login!
                </Button>
                {busy && <Spinner variant='info' animation='border' />}
            </Form>
        </>
    );
};

export default LoginPage;