const TelegramApi = require('node-telegram-bot-api');
const {stringify} = require("nodemon/lib/utils");
const token = '6754262786:AAHQdeKAcfTMO_xew6x4S3fuPmakCGfw-5I';
const bot = new TelegramApi(token, {polling: true})


const webAppUrl = 'https://fishington.netlify.app/';


// const sequelize = require('./db');
// const UserModel = require('./models');

var fish = 'Ничего не поймал';
var prevEvent = '';

const gameOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Поймать', callback_data: 'durev'}],
            [{text: 'Играем!', web_app: {url: webAppUrl}}]
        ]
    })
}

const start = async () => {

    // try {
    //     await sequelize.authenticate();
    //     await sequelize.sync();
    //     console.log('Успешно подключились к безе данных');
    //
    // }catch(e){
    //     console.log('Нет подключения к базе данных')
    // }

    await bot.setMyCommands([
        {command: '/start', description: 'Начальное приветствие'},
        {command: '/info', description: 'Информация о приложении'},
        {command: '/game', description: 'Начинаем игру'},
    ])

    bot.on('message', async msg=> {
        const text = msg.text;
        const chatId = msg.chat.id;

        try {
            if (text === '/start') {
                // await UserModel.create({chatId});
                await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/e80/caf/e80caf10-3990-4254-bda6-1f5c09851618/1.webp')
                return bot.sendMessage(chatId, `Добро пожалывать на крипторыбалку ${msg.from.first_name}!`)
            }
            if (text === '/info') {
                // const user = await UserModel.findOne({chatId})
                // return  bot.sendMessage(chatId, `Рыба порожденная блокчейном. Ты поймал ${user.fish} дурев рыбы`)
                return  bot.sendMessage(chatId, `Рыба порожденная блокчейном.`)

            }
            if (text === '/game') {
                await bot.sendMessage(chatId, 'Клюет!')
                return bot.sendMessage(chatId, 'Цзинь', gameOptions);
            }
            return bot.sendMessage(chatId, 'Я тебя не понимаю, попробуй еще раз')
        }catch (e) {
            return bot.sendMessage(chatId, "Some error happening here");
        }
    })

    bot.on(`callback_query`, async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        // await bot.sendMessage(chatId, fish)
        await bot.sendMessage(chatId, `Ты поймал рыбу смешарика весом ${Math.floor(10*Math.random())} килограммов`);

        // fish = 'Ничего не поймал';


        // const user = await UserModel.findOne({chatId})
        // await bot.sendMessage(chatId, `Ты поймал рыбу ${data}`)
        // user.fish +=1;


        // await user.save();
    })
}

start()


