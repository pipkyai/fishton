const TelegramApi = require('node-telegram-bot-api');

const token = '6754262786:AAHQdeKAcfTMO_xew6x4S3fuPmakCGfw-5I';

const bot = new TelegramApi(token, {polling: true})

const chats = {}

const gameOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Поймать ДуревФиш', callback_data: 'durev'}],
            [{text: 'Поймать НомерФиш', callback_data: 'number'}],
            [{text: 'Поймать ПремиумФиш', callback_data: 'premium'}],
            [{text: 'Поймать НотФиш', callback_data: 'not'}],
        ]
    })
}

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Начальное приветствие'},
        {command: '/info', description: 'Информация о приложении'},
        {command: '/game', description: 'Начинаем игру'},
    ])

    bot.on('message', async msg=> {
        const text = msg.text;
        const chatId = msg.chat.id;

        if (text === '/start') {
            await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/e80/caf/e80caf10-3990-4254-bda6-1f5c09851618/1.webp')
            return bot.sendMessage(chatId, `Добро пожалывать на крипторыбалку ${msg.from.first_name}!`)
        }
        if (text === '/info') {
            return  bot.sendMessage(chatId, 'Рыба порожденная блокчейном. Когда рыба клюет лучше?')
        }
        if (text === '/game') {
            await bot.sendMessage(chatId, 'Клюет!')
            const fish = 'DurevFish'
            chats[chatId] = fish;
            return bot.sendMessage(chatId, fish, gameOptions);
        }
        return bot.sendMessage(chatId, 'Я тебя не понимаю, попробуй еще раз')
    })

    bot.on(`callback_query`, msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;

        bot.sendMessage(chatId, `Ты поймал рыбу ${data}`)
    })
}

start()