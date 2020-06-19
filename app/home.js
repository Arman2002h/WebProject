module.exports = {
    Method:"get",
    URL: "/",
    callback: ( req, res) => {
        res.sendFile(__dirname+'/front/index.html');
    }
};