if (process.env.Node_ENV !== 'production') {
    require('dotenv').config();
}

const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/camp-journey';
mongoose.connect(dbUrl);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const Sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i++) {
        const randomIndex = Math.floor(Math.random() * cities.length);
        const Price = Math.floor(Math.random() * 20) + 10;
        
        const camp = new Campground({
            author: '68b9466b170ed9eec40cae71',
            location: `${cities[randomIndex].city}, ${cities[randomIndex].state}`,
            title: `${Sample(descriptors)} ${Sample(places)}`,
            description: 'Experience the magic of Indian outdoors in our premium campsites. Unplug, relax, and connect with nature.',
            price: Price,
            geometry: {
                type: 'Point',
                coordinates: [ 
                    cities[randomIndex].longitude,
                    cities[randomIndex].latitude,
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