import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { otpverification } from '../../redux/actions/user';
import toast from 'react-hot-toast';


const OtpVerification = () => {
    const [otp, setOtp] = useState("");

    const { number, message,error} = useSelector(state => state.user);

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(otpverification(otp, number));

    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch({ type: 'clearError' });
        }

        if (message) {
            toast.success(message);
            dispatch({ type: 'clearMessage' });
        }

    }, [dispatch, error, message])

    return (
        <Container py={'16'} h={'85vh'}>
            <form onSubmit={submitHandler} >
                <Heading
                    children="Otp Verification"
                    my="16"
                    textTransform={"uppercase"}
                    textAlign={['center', 'left']}
                />
                <VStack spacing={'8'}>
                    <Input
                        required
                        value={otp}
                        onChange={e => setOtp(e.target.value)}
                        placeholder='Enter the OTP'
                        type='number'
                        focusBorderColor="red.500"
                    />
                </VStack>
                <Button type='submit' colorScheme='red' my={'4'}>
                    Verify OTP
                </Button>

            </form>
        </Container>
    )

}

export default OtpVerification