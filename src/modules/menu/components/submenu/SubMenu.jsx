import {cloneElement} from "react";
import {useTranslate} from "@modules/menu/hook/useTranslate.js";

export const SubMenu = ({ subList, id }) => {
    const {t} = useTranslate();

    return (
        <>
            <span className='px-4 py-2 block'>
                {t('language')}
            </span>
            <ul id={id} className='flex flex-col absolute left-0 top-0 -translate-x-full text-gray-300 scale-x-0 bg-gray-700
            transition-transform origin-right w-[clamp(140px,100%,150px)]'>
                {subList.map((submenuItem, index) => (
                    <li key={index} className='px-4 py-2 hover:bg-gray-300/20'>
                        {cloneElement(submenuItem.element, {onClick: submenuItem.onClick})}
                    </li>
                ))}
            </ul>
        </>
    )
}