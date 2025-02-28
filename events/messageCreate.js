const { Events } = require('discord.js');
const natural = require('natural'); // Library for fuzzy matching

// List of greetings the bot should recognize (including typos)
const greetings = [
    'hello bot', 'hi bot', 'hey bot', 'greetings bot', 'sup bot',
    'helo bot', 'helloo bot', 'hallo bot', 'yo bot', "what's up bot"
];

// List of possible responses for variety
const greetingResponses = [
    'Hello there!', 'Hey!', 'Hi, how can I help?', 'Yo!',
    'Greetings, human!', "What's up?", 'How are you doing?'
];

// Function to check for typos using Jaro-Winkler distance
function isSimilar(input, options, threshold = 0.85) {
    return options.some(option => natural.JaroWinklerDistance(input, option) >= threshold);
}

module.exports = {
    name: Events.MessageCreate,
    execute(message, client) {
        if (message.author.bot) return; // Ignore bot messages
        
        const userMessage = message.content.toLowerCase();
        
        // Greeting detection with typo correction
        if (isSimilar(userMessage, greetings)) {
            const randomResponse = greetingResponses[Math.floor(Math.random() * greetingResponses.length)];
            return message.reply(randomResponse);
        }

        // Fun facts feature
        const funFacts = [
            'Did you know honey never spoils?',
            'Bananas are berries, but strawberries are not!',
            'Octopuses have three hearts!',
            'A day on Venus is longer than a year on Venus!',
            'Water can boil and freeze at the same time!'
        ];
        
        if (userMessage.includes('tell me a fact')) {
            const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
            return message.reply(randomFact);
        }
        
        // Joke responses
        const jokes = [
            'Why did the chicken join a band? Because it had the drumsticks!',
            'Why don’t skeletons fight each other? They don’t have the guts!',
            'What do you call fake spaghetti? An impasta!',
            'Why did the scarecrow win an award? Because he was outstanding in his field!'
        ];
        
        if (userMessage.includes('tell me a joke')) {
            const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
            return message.reply(randomJoke);
        }
        
        // Weather command (basic simulation)
        if (userMessage.includes("what's the weather like")) {
            return message.reply("I'm not a meteorologist, but I can tell you it's always sunny inside this bot! ☀️");
        }
        
        // Echo feature for fun
        if (userMessage.startsWith('repeat after me')) {
            const toRepeat = userMessage.replace('repeat after me', '').trim();
            if (toRepeat.length > 0) {
                return message.reply(toRepeat);
            }
        }
        
        // 8-ball feature
        if (userMessage.startsWith('8ball')) {
            const responses = [
                'Yes!', 'No.', 'Maybe...', 'Ask again later.', 'Definitely!', 'I wouldn’t count on it.', 'Most likely!', 'I have no idea.'
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            return message.reply(`🎱 ${randomResponse}`);
        }
        
        // Dice roll feature
        if (userMessage.startsWith('roll dice')) {
            const diceRoll = Math.floor(Math.random() * 6) + 1;
            return message.reply(`🎲 You rolled a ${diceRoll}!`);
        }
        
        // Compliments feature
        const compliments = [
            "You're doing great!", "You're awesome!", "You're a fantastic human being!", "Keep up the great work!", "You're inspiring!"
        ];
        
        if (userMessage.includes('give me a compliment')) {
            const randomCompliment = compliments[Math.floor(Math.random() * compliments.length)];
            return message.reply(randomCompliment);
        }
        
        // Catch-all response for unknown messages
        if (Math.random() > 0.9) { // 10% chance to reply to random messages
            const randomReplies = [
                "I'm not sure what you mean, but I like your enthusiasm!",
                'Interesting... tell me more!',
                'I wish I had an answer for that!',
                'Hmm, let me think about that...'
            ];
            return message.reply(randomReplies[Math.floor(Math.random() * randomReplies.length)]);
        }
    },
};
