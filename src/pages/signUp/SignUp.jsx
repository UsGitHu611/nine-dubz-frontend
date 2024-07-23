import { Registration } from "@modules/registrationForm/Registration";
import { Flex } from "antd";

export const SignUp = () => {
    return (
        <section className='bg-container'>
            <Flex justify='center'>
                <Registration/>
            </Flex>
        </section>
    );
}

