import {
    Box,
    Button,
    Container,
    FormLabel,
    Heading,
    Input,
    VStack
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../redux/actions/user';


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    return (
        <Container h={'95vh'}>
            <VStack h={'full'} justifyContent="center" spacing={'16'}>
                <Heading children={'Welcome to CourseStack'} />

                <form onSubmit={submitHandler} style={{ width: '100%' }}>
                    <Box my={'4'}>
                        <FormLabel htmlFor="email" children="Email Address" />
                        <Input
                            required
                            id="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="abc@gamil.com"
                            type={"email"}
                            focusBorderColor="red.500"
                        />
                    </Box>

                    <Box my={'4'}>
                        <FormLabel htmlFor="password" children="password" />
                        <Input
                            required
                            id="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Enter Your Password"
                            type={"password"}
                            focusBorderColor="red.500"
                        />
                    </Box>

                    <Box>
                        <Link to="/forgetpassword">
                            <Button fontSize={"sm"} variant="link">
                                Forget Password?
                            </Button>
                        </Link>
                    </Box>
                    <Button my="4" colorScheme={"red"} type="submit">
                        Login
                    </Button>

                    <Box my="4">
                        Login with Mobile Number?{' '}
                        <Link to="/mobilelogin">
                            <Button colorScheme={'red'} variant="link">
                                Click
                            </Button>{" "}
                            here
                        </Link>
                    </Box>

                    <Box my="4">
                        New USer?{' '}
                        <Link to="/register">
                            <Button colorScheme={'red'} variant="link">
                                Sign Up
                            </Button>{" "}
                            here
                        </Link>
                    </Box>
                </form>
            </VStack>
        </Container>
    )
};

export default Login


