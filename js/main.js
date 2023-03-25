const PHOTOS_COUNT = 25;
const MAX_COMMENTS_COUNT = 1000;

const descriptions = [
    'Лучшее украшение жизни – хорошее настроение.',
    'Фотография – просто мгновение прошлого. Не уделяйте им так много значения.',
    'Я не доверяю словам. Я доверяю фотографиям. (c) Жиль Перес',
    'Возвышайте свои слова, а не голос. Цветы растут от дождя, а не от громa.',
    'Готовый ко всему не поражается неизбежным.',
    'Будьте мудрыми, не делайте ошибок.',
    'В этом мире нет ничего вечного. Всё потихоньку рассыпается. (c) Чак Паланик',
    'Некоторые мгновения имеют привкус вечности.',
    'Не ищи что сказать, говори как есть.',
    'Только тот, кто делает, чему-то научится.'
];

const commentMessages = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const commentatorsNames = [
    'Борис',
    'Аркадий',
    'Иван',
    'Мария',
    'Александр',
    'Анна',
    'Илья',
    'Вениамин',
    'Анжелла',
    'Вова'
];

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];

const createRandomIdFromRangeGenerator = (min, max) => {
    const previousValues = [];

    return () => {
        let currentValue = getRandomInt(min, max);
        if (previousValues.length >= (max - min + 1)) {
            return null;
        }

        while (previousValues.includes(currentValue)) {
            currentValue = getRandomInt(min, max);
        }
        previousValues.push(currentValue);
        return currentValue;
    };
};

const generatePhotoId = createRandomIdFromRangeGenerator(1, PHOTOS_COUNT);
const generateCommentId = createRandomIdFromRangeGenerator(1, MAX_COMMENTS_COUNT);

const createComment = () => {
    const comment = {};
    comment.id = generateCommentId();
    comment.avatar = `img/avatar-${getRandomInt(1, 6)}.svg`;
    comment.message = getRandomArrayElement(commentMessages);
    comment.name = getRandomArrayElement(commentatorsNames);
    return comment;
};

const getComments = () => {
    const postCommentsCount = getRandomInt(1, 3);
    const comments = [];
    for (let i = 0; i < postCommentsCount; i++) {
        comments.push(createComment());
    }
    return comments;
};

const createPhotoData = () => {
    const photoData = {};
    photoData.id = generatePhotoId();
    photoData.url = `photos/${photoData.id}.jpg`;
    photoData.description = getRandomArrayElement(descriptions);
    photoData.likes = getRandomInt(15, 200);
    photoData.comments = getComments();
    return photoData;
};

// По заданию данные нужно просто сгенерировать, но далее они никуда не идут.
// При сохранении результата в переменную линтер ругается на неиспользуемую переменную, из-за чего падает проверка кода при пулл реквесте.
// Как временное решение оставлю здесь выражение без присваивания в переменную.
Array.from({length: PHOTOS_COUNT}, createPhotoData);
