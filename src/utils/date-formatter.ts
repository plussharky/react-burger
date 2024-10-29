import { string } from "prop-types";

const MILLISECONDS_IN_MINUTE = 1000 * 60;
const MILLISECONDS_IN_HOUR = MILLISECONDS_IN_MINUTE * 60;
const MILLISECONDS_IN_DAY = MILLISECONDS_IN_HOUR * 24;
const DAYS_IN_WEEK = 7;

const MONTH_NAMES: string[] = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
];

export function formatDate(date: Date | string): string {
    if (typeof date == "string") {
        date = new Date(date);
    }
    const now = new Date();
    const diffMiliseconds = now.getTime() - date.getTime(); 
    const diffInDays = Math.floor(diffMiliseconds / MILLISECONDS_IN_DAY);
    const hours = addZero(date.getHours());
    const minutes = addZero(date.getMinutes());

    if (diffInDays === 0) {
        return `сегодня, ${hours}:${minutes}`;
    } else if (diffInDays < DAYS_IN_WEEK) {
        return `${diffInDays} ${getDaysWord(diffInDays)} назад, ${hours}:${minutes}`;
    } else {
        const day = date.getDate();
        const month = MONTH_NAMES[date.getMonth()];
        return `${day} ${month}, ${hours}:${minutes}`;
    }
}

function getDaysWord(diffInDays: number): string {
    return (diffInDays % 10 === 1 && diffInDays % 100 !== 11) 
            ? "день" 
            : (diffInDays % 10 >= 2 && diffInDays % 10 <= 4 && 
                (diffInDays % 100 < 10 || diffInDays % 100 >= 20)) 
                ? "дня" 
                : "дней";
}

function addZero(num: number): string {
    return num < 10 
        ? '0' + num 
        : num.toString();
} 