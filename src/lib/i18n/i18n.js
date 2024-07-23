import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        fallbackLng: 'ru',
        interpolation: {
            escapeValue: false,
        },
        resources: {
            en: {
                translation: {
                    registration: "Registration",
                    login: "Login",
                    logout: "Logout",
                    language: "Language",
                    studio: "Studio"
                }
            },
            ru: {
                translation: {
                    registration: "Регистрация",
                    login: "Вход",
                    logout: "Выйти",
                    language: "Язык",
                    studio: "Студия"
                }
            }
        }
    })

export default i18n;