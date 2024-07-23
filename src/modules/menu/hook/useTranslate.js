import { useTranslation } from 'react-i18next';

export const useTranslate = () => {
    const { i18n, t } = useTranslation();
    const translation = (lang) => i18n.changeLanguage(lang);
    return { t, translation };
}