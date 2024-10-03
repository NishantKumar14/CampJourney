const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/camp-journey');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const Sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const Price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '66e017c0a0e7ddc8091f8bda',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${Sample(descriptors)}, ${Sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, modi qui! Accusantium incidunt ut nesciunt at adipisci. Aperiam molestiae quis voluptatem quod enim sapiente, voluptas ab veritatis culpa tenetur magnam.',
            price: Price,
            geometry: {
                type: 'Point',
                coordinates: [ 
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/nishant0107/image/upload/v1726378347/CampJourney/oncen4wwon9e42ncmj9r.jpg',
                  filename: 'CampJourney/oncen4wwon9e42ncmj9r'
                },
                {
                  url: 'https://res.cloudinary.com/nishant0107/image/upload/v1726378350/CampJourney/ipj1xktpftvlg8i5f9hd.jpg',
                  filename: 'CampJourney/ipj1xktpftvlg8i5f9hd'
                },
                {
                  url: 'https://res.cloudinary.com/nishant0107/image/upload/v1726378351/CampJourney/vqqlcj3g6n05ydylcea6.jpg',
                  filename: 'CampJourney/vqqlcj3g6n05ydylcea6'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close(); 
})