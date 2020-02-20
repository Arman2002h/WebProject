let fs = require('fs');
var Hand = require('pokersolver').Hand;

let parser = require('./modules/parser')

let winners = [];
let winPlayer1 = 0;
fs.writeFileSync("result.json", "")
fs.readFile('combinations.txt', 'utf8', function (err, data) {
    let games = parser(data);
    games.forEach(game => {
        if (game != null) {
            let hands = [];
            for (let i in game) {
                hands.push(Hand.solve(game[i]))
                for (let y in game[i]) {
                    game[i][y] = game[i][y].split('').reverse().join('')
                }
            }
            let win = Hand.winners(hands);
            let cart = '';
            if (win[0])
                for (let i in win[0].cards) {
                    cart += (win[0].cards[i].suit + win[0].cards[i].value + ' ').toUpperCase()
                    cart = cart.replace(/T/g, '10')
                }
            winners.push({
                'gamers_cart': game,
                'winer': cart
            });
            cart = cart.split(' ')
            cart.pop()
            if(game[0]!=undefined)
                if(arraysComparison(game[0],cart))winPlayer1++
        }
    });
    fs.writeFileSync("result.json", JSON.stringify(winners))
    winners.forEach(el => {
        //console.log(el.gamers_cart,el.winer)
    });
    console.log(`Player1 1 win -> ${winPlayer1}`)
});

function arraysComparison(arr1, arr2) {
    if (arr1.length != arr2.length) return false;
    let copy = arr2;
    for (let i = 0, flag = false; i < arr1.length; i++ , flag = false) {
        for (let j = 0; j < copy.length; j++) {
            if (arr1[i] instanceof Object) {
                if (Array.isArray(arr1[i])) {
                    if (Array.isArray(copy[j])) {
                        if (arraysComparison(arr1[i], copy[j])) {
                            copy.splice(j, 1);
                            flag = true;
                            break;
                        }
                    }
                }
                else {
                    if ((copy[j] instanceof Object) && !Array.isArray(copy[j])) {
                        if (objectsComparison(arr1[i], copy[j])) {
                            copy.splice(j, 1);
                            flag = true;
                            break;
                        }
                    }
                }
            }
            if (copy[j] === arr1[i]) {
                copy.splice(j, 1);
                flag = true;
                break;
            }
        }
        if (!flag) return false;
    }
    return true;
}