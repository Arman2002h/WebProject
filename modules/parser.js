module.exports = data => {
    data = data.replace(/10/g, "T").split('\n')
    for(let i in data){
        if(data[i] != '')data[i] = data[i].split('==');
        for(let j in data[i])
            data[i][j] = data[i][j].split(' ')
    }
    let resdata = [];
    for(let i in data){
        resdata.push([])
        for(let y in data[i]){
            resdata[i].push([])
            for(let x in data[i][y]){
                if(data[i][y][x] != '')resdata[i][y].push(data[i][y][x].split('').reverse().join(''))
            }
        }
    }
    data = resdata

    return data;
}
