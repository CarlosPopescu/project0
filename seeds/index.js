const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: '642d5637487ef9441dba2ec4',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore non facilis quo consectetur Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore non facilis quo consectetur, ipsum suscipit maxime culpa praesentium molestiae accusamus tempore, quasi assumenda vitae vel aut excepturi nesciunt ut. Adipisci?',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dxygupnug/image/upload/v1681154933/mdelrr6x3hwlbd5vzhph.jpg',
                    filename: 'YelpCamp/mdelrr6x3hwlbd5vzhph',
                },
                {
                    url: 'https://res.cloudinary.com/dxygupnug/image/upload/v1681153928/lcdfnvzfrnepk5d60lb3.jpg',
                    filename: 'YelpCamp/lcdfnvzfrnepk5d60lb3',
                },
                {
                    url: 'https://res.cloudinary.com/dxygupnug/image/upload/v1681298429/YelpCamp/gaanzepizalmknzr4two.jpg',
                    filename: 'YelpCamp/gaanzepizalmknzr4two',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})