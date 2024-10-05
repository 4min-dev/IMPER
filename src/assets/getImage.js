const images = require.context('../assets', true, /\.(png|jpg|jpeg|svg)$/); // Поддерживаемые форматы

export default function getImage (imageName) {
    try {
        return images(`./images/${imageName}`);
    } catch (error) {
        console.error(`Image not found: ${imageName}`, error);
        return null; // Можно вернуть изображение по умолчанию, если нужно
    }
};

// Функция предназначена для доступа к папке src/assets/images для более 
// быстрого доступа к содержимому этой папки без постоянных ручных импортов. Для папки icons существует 
// идентичная функция. Не забывайте так же указывать расширение файла .png // .jpeg и тд