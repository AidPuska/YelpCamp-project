const mongoose = require('mongoose')
const Campground = require('../models/campground')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connetion error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 50) + 10;
        const camp = new Campground({
            location: `${cities[random].city}, ${cities[random].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Some decription text that will be shown od show page',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random].longitude,
                    cities[random].latitude

                ]
            },
            author: '635797eb81ffb4ea05a30b0f',
            images: [
                {
                    url: 'https://res.cloudinary.com/dseufa3sg/image/upload/v1666778763/YelpCamp/lfmgdsewfldm68a3dmi5.jpg',
                    filename: 'YelpCamp/lfmgdsewfldm68a3dmi5',

                },
                {
                    url: 'https://res.cloudinary.com/dseufa3sg/image/upload/v1666778794/YelpCamp/xllcow7zl1by0vyjjyfm.jpg',
                    filename: 'YelpCamp/xllcow7zl1by0vyjjyfm',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})