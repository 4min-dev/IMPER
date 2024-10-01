const icons = require.context('../assets', true, /\.(png|jpg|jpeg|svg)$/); // Поддерживаемые форматы

export default function getIcon (iconName) {
    try {
        return icons(`./icons/${iconName}`);
    } catch (error) {
        console.error(`Icon not found: ${iconName}`, error);
        return null; // Можно вернуть изображение по умолчанию, если нужно
    }
};

// Функция предназначена для доступа к папке src/assets/icons для более 
// быстрого доступа к содержимому этой папки без постоянных ручных импортов. Для папки images существует 
// идентичная функция. Не забывайте так же указывать расширение файла .png // .jpeg и тд