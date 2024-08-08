import {lazy, Suspense} from "react";

const Login = lazy(() => import('@modules/login/Login.jsx'))

const SignIn = () => {
    return (
        <Suspense fallback={<small>ahahahaa</small>}>
            <section className='bg-container min-h-[calc(100vh_-_170px)] flex justify-center items-center'>
                <Login/>
            </section>
        </Suspense>
    );
}

export default SignIn;