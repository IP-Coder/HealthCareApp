const mongoose = require('mongoose');
// mongoose.set('strictQuery', true);
const dbUrl = 'mongodb+srv://pranjal:Pranjal9044@cluster0.pwuiskb.mongodb.net/healthcare';
const connecttomongo = async () => {
    try {
        await mongoose.connect(dbUrl, () => {
            console.log('connected to db');
        });
    }
    catch (e) {
        console.log(e);
    }
}
module.exports = connecttomongo;