export default function generateRandomEmail(prefix = 'test') {
    const randomString = Math.random().toString(36).substring(2, 11); // Генерує випадковий рядок довжиною 9 символів
    return `${prefix}_${randomString}@yopmail.com`;
}

