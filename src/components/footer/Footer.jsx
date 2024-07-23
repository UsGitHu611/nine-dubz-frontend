import { Layout as LayoutAntd } from "antd";

export const Footer = () => {
    return (
        <LayoutAntd.Footer className='bg-container'>
            <p className='text-gray-200 text-center'>
                &copy; Автор этой хуйни лично владеет правом делать озвучку на эти фильмы.
            </p>
        </LayoutAntd.Footer>
    )
}