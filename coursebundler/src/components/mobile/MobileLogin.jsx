import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { mobilelogin } from '../../redux/actions/user';
import { useNavigate } from 'react-router-dom';
import  toast  from 'react-hot-toast';

const MobileLogin = () => {

    const [number, setNumber] = useState("");

    const [returnNumber, setReturnNumber] = useState("");

    const userNumber = useSelector((state) => state.user.number);

    const { message, error } = useSelector((state) => state.user);

    useEffect(() => {
        setReturnNumber(userNumber);
        if (returnNumber) {
            navigate("/mobilelogin/verify")
        }

        if (error) {
            toast.error(error);
            dispatch({ type: 'clearError' });
        }

        if (message) {
            toast.success(message);
            dispatch({ type: 'clearMessage' });
        }
    }, [dispatch, error, message]);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(mobilelogin(number));

    };


    return (
        <Container py={'16'} h={'85vh'}>
            <form onSubmit={submitHandler}>
                <Heading
                    children="Login With Mobile Number"
                    my="16"
                    textTransform={"uppercase"}
                    textAlign={['center', 'left']}
                />
                <VStack spacing={'8'}>
                    <Input
                        required
                        value={number}
                        onChange={e => setNumber(e.target.value)}
                        placeholder='Enter your Mobile Number'
                        type='number'
                        focusBorderColor="red.500"
                    />
                </VStack>
                <Button type='submit' colorScheme='red' my={'4'}>
                    OTP Generate
                </Button>
            </form>
        </Container>

    )
};

export default MobileLogin