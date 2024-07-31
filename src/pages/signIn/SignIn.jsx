import {Flex} from "antd";
import {Login} from "@modules/login/Login.jsx";

export const SignIn = () => {
    return (
        <section className='bg-container'>
            <Flex justify='center'>
                <Login/>
            </Flex>
        </section>
    );
}

