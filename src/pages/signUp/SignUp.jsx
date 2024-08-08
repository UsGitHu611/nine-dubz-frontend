import {lazy, Suspense} from "react";

const Registration = lazy(()=> import('@modules/registrationForm/Registration'));

const SignUp = () => {
    return (
        <Suspense fallback={<small>ahahaahha</small>}>
            <section className='bg-container min-h-[calc(100vh_-_170px)] flex justify-center items-center'>
                <Registration/>
            </section>
        </Suspense>
    );
}

export default SignUp;