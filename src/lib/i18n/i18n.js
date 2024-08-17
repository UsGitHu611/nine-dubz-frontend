import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        fallbackLng: 'ru',
        detection : {
            caches : ['cookie'],
            lookupCookie : 'lang'
        },
        interpolation: {
            escapeValue: false,
        },
        resources: {
            eng: {
                translation: {
                    '404': 'Be careful, a scientist ahead!',
                    footer: "The author of this shit personally owns the right to do voiceovers for these films.",
                    registration: "Registration",
                    login: "Login",
                    logout: "Logout",
                    language: "Language",
                    studio: "Studio",
                    successRegisterTitle: "You have successfully registered!",
                    successDetailEditTitle: "Edit",
                    successDetailEditDescription: "The data has been successfully updated",
                    successRegisterMessage: "A confirmation email has been sent to your email address",
                    successAddTitle : "Processing",
                    successAddDescription: "The video is being processed",
                    beta: "The site is currently in beta testing. Currently, only the site administration has access to the studio, later it will be available to other users."
                }
            },
            ru: {
                translation: {
                    '404': 'Осторожно, ученый!',
                    footer: "Автор этой хуйни лично владеет правом делать озвучку на эти фильмы.",
                    registration: "Регистрация",
                    login: "Вход",
                    logout: "Выйти",
                    language: "Язык",
                    studio: "Студия",
                    successRegisterTitle: "Вы успешно зарегистрированы!",
                    successDetailEditTitle: "Редактирование",
                    successDetailEditDescription: "Данные успешно обновлены",
                    successRegisterMessage: "Письмо для подтверждения регистрации было выслано вам на почту",
                    successAddTitle : "Обработка",
                    successAddDescription: "Видео находится в обработке",
                    beta: "На данный момент сайт находится в стадии бета-тестирования. Сейчас доступ к студии есть только у администрации сайта, а для остальных пользователей станет доступен позже."
                }
            }
        }
    })

export default i18n;