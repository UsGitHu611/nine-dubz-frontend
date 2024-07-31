export const [rulesLogin, rulesEmail, rulesPassword] = [
    {
        required: true,
        pattern: "^[a-zа-яёA-ZA-ЯЁ0-9]{2,}$",
        message: "Неверный логин",
        
    },
    {
        required: true,
        pattern: "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$",
        message: "Неверный email"
    },
    {
        required: true,
        pattern: "^[a-zA-Z0-9$~@#%*!&?=()]{8,}$",
        message: "Неверный пароль"
    }
]

export const tooltipRulesLogin = [
    "Латиницу и кириллицу",
    "Цифры"
];

export const tooltipRulesPassword = [
    "Латиницу",
    "Спец. символы",
    "Цифры",
];