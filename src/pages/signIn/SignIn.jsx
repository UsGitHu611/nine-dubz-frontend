import {lazy, Suspense} from "react";

const Login = lazy(() => import('@modules/login/Login.jsx'))

const SignIn = () => {
    return (
        <Suspense fallback={<small>ahahahaa</small>}>
            <section className='flex items-center mx-auto'>
                <Login/>
            </section>
        </Suspense>
    );
}

export default SignIn;