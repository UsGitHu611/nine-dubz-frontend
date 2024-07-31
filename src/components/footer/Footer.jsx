import { Layout as LayoutAntd } from "antd";
import {useTranslate} from "@modules/menu/hook/useTranslate.js";

export const Footer = () => {
    const {t} = useTranslate();
    return (
        <LayoutAntd.Footer className='bg-container'>
            <p className='text-gray-200 text-center'>
                &copy; {t('footer')}
            </p>
        </LayoutAntd.Footer>
    )
}