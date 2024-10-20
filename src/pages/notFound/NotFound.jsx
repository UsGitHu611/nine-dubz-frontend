import BeCarefulScientist from '@/assets/img/carefulScientist.png'
import {t} from "i18next";

export const NotFound = () => {
    return (
        <section className='flex items-center mx-auto justify-center'>
            <div className='text-center max-w-[350px] md-mobile:max-w-[250px]'>
                <img className='w-full' src={BeCarefulScientist} alt="404"/>
                <p className='text-2xl text-gray-200'>{t('404')}</p>
            </div>
        </section>
    )
}