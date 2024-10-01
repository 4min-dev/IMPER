export function defineDay(day) {
    const dayInLowerCase = day.toLowerCase();
    
    switch (dayInLowerCase) {
        case 'sunday':
            return 'воскресенье';
        case 'monday':
            return 'понедельник';
        case 'tuesday':
            return 'вторник';
        case 'wednesday':
            return 'среда';
        case 'thursday':
            return 'четверг';
        case 'friday':
            return 'пятница';
        case 'saturday':
            return 'суббота';
        default:
            return day;
    }
}