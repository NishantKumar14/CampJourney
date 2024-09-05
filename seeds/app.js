const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campgound');

mongoose.connect('mongodb://localhost:27017/camp-journey');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const Sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const Price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${Sample(descriptors)}, ${Sample(places)}`,
            image: `https://picsum.photos/400?random=${Math.random()}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, modi qui! Accusantium incidunt ut nesciunt at adipisci. Aperiam molestiae quis voluptatem quod enim sapiente, voluptas ab veritatis culpa tenetur magnam.',
            price: Price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close(); 
})