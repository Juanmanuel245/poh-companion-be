const mongoose = require('mongoose');


const dbConnection = async() => {

    try {
        await mongoose.connect(process.env.DB_CONN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('DB ONLINE');

    }catch (error){
        console.error(error);
        throw new Error('Error a la hora de inicializar la DB');
    }
}

module.exports = {
    dbConnection
}