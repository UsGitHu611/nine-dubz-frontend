import {Container} from "@components/container/Container.jsx";
import {lazy, Suspense} from "react";

const StudioPanel = lazy(() => import('@modules/studioPanel/StudioPanel.jsx'))

export const Studio = () => {
    return (
        <Suspense fallback={<small>ahahahaa</small>}>
            <section>
                <Container>
                    <StudioPanel/>
                </Container>
            </section>
        </Suspense>
    )
}