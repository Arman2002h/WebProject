let fs = require('fs');
var Hand = require('pokersolver').Hand;

let parser = require('./modules/parser')

let winners = [];
fs.writeFileSync("result.json", "")
fs.readFile('combinations.txt', 'utf8', function(err, data) {
    let games = parser(data);
    games.forEach(game => {
        let hands = [];
        for(let i in game)hands.push(Hand.solve(game[i]))
        let win =  Hand.winners(hands);
        let cart = '';
        if(win[0])
            for(let i in win[0].cards){
                cart += (win[0].cards[i].suit+win[0].cards[i].value+' ').toUpperCase()
                cart = cart.replace(/T/g , '10')
            }
        winners.push({
            'gamers_cart':game,
            'winer':cart
        });
    });
    fs.writeFileSync("result.json", JSON.stringify(winners))
    console.log(winners)
});