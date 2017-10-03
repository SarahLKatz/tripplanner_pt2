const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/tripplanner', {logging: false});

const Place = db.define('place', {
    address: Sequelize.STRING,
    city: Sequelize.STRING,
    state: Sequelize.STRING,
    phone: Sequelize.STRING,
    location: Sequelize.ARRAY(Sequelize.FLOAT)  
})

const Hotel = db.define('hotel',{
    name: Sequelize.STRING,
    num_stars: {
        type: Sequelize.FLOAT,
        validate: {
            min: 1,
            max: 5
        }
    },
    amenities: Sequelize.STRING
})

const Restaurant = db.define('restaurant',{
    name: Sequelize.STRING,
    cuisine: Sequelize.STRING,
    price: {
        type: Sequelize.INTEGER,
        validate: {
            min:1,
            max: 5
        }
    }
})

const Activity = db.define('activity',{
    name: Sequelize.STRING,
    age_range: Sequelize.STRING
})

Hotel.belongsTo(Place);
Restaurant.belongsTo(Place);
Activity.belongsTo(Place);

// db.sync({force: true})
// .then(()=> console.log('it worked!'))
// .catch(() => console.log('it didnt work!'))

module.exports = {db, Hotel, Restaurant, Activity, Place};