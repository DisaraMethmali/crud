const mongoose = require('mongoose');

const dbConnect = () => {
    mongoose.connect(process.env.MONGODB_URL, {

    }).then(() => console.log('Db connected')).catch(err => console.log(err));

};
module.exports = dbConnect;

/*mongodb+srv://dis:tRPMxJ8vJtPsbbz5@cluster0.l8qlknk.mongodb.net/*/
/*tRPMxJ8vJtPsbbz5*/