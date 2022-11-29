require('dotenv').config();

const fs = require('fs')
const https = require('https')
const express = require('express');
const cors = require('cors');
const Ads = require('./src/models/ads.model');
const Company = require('./src/models/company.model');
const app = express();
require('./src/db/db');

app.use(cors());
app.use(express.json());
app.use('/', express.static(__dirname + '/static'));

app.get('/add-company', async (req, res) => {
    var data = [
        {
            _id: 1,
            name: "Levi's",
            url: 'http://levis.com/'
        },
        {
            _id: 2,
            name: 'Puma',
            url: 'http://puma.com/'
        },
        {
            _id: 3,
            name: 'Salesforce',
            url: 'http://salesforce.com/'
        },
        {
            _id: 4,
            name: 'Adidas',
            url: 'http://adidas.com/'
        },
        {
            _id: 5,
            name: 'Nike',
            url: 'http://nike.com/'
        },
        {
            _id: 6,
            name: 'Cotopaxi',
            url: 'http://cotopaxi.com/'
        },
        {
            _id: 7,
            name: 'Netflix',
            url: 'http://netflix.com/'
        },
        {
            _id: 8,
            name: 'Colgate',
            url: 'http://colgate.com/'
        },
        {
            _id: 9,
            name: 'Valentino',
            url: 'http://valentino.com/'
        },
        {
            _id: 10,
            name: 'Curology',
            url: 'http://curology.com/'
        },
        {
            _id: 11,
            name: 'Purple',
            url: 'http://purple.com/'
        },
    ]
   
    // var result = await Company.insertMany(data)
    res.json(data);
})

app.get('/add-ads', async (req, res) => {

    var data = [
        {
            _id: 1,
            companyId: 3,
            primaryText: "The world’s leading CRM is ready to help you simplify the business part of your small business.",
            headline: 'Salesforce for Small Business',
            description: '',
            CTA: 'Sign Up',
            imageUrl: 'https://drive.google.com/file/d/17huYmoSHdbgcNqfoO4yYYGIFf8X1243T/view?usp=sharing'
        },
        {
            _id: 2,
            companyId: 1,
            primaryText: "We like where you’re going with this.",
            headline: "Relaxed Fit Men's Jeans",
            description: '',
            CTA: 'Shop Now',
            imageUrl: 'https://drive.google.com/file/d/17kQiqGnkLEZZmnzLlWG7ZIlN6XbwAVfb/view?usp=sharing'
        },
        {
            _id: 3,
            companyId: 6,
            primaryText: "Teva x Cotopaxi is back! Celebrate eternal summer with limited-edition Teva x Cotopaxi Original Universal sandals in bold new colors.",
            headline: "Made With Recycled Plastic",
            description: "Shop Back to School",
            CTA: 'Shop Now',
            imageUrl: 'https://drive.google.com/open?id=17nXWIFT-63JLfEvBEuQiyDYmA2dckCmq&authuser=rohit103%40gmail.com&usp=drive_fs'
        },
        {
            _id: 4,
            companyId: 7,
            primaryText: "The Emmy-nominated Netflix comedy special from the late Norm Macdonald is his last gift to the world of comedy he helped shape.",
            headline: "Norm Macdonald's Nothing Special gives one last dose of the late comic",
            description: "",
            CTA: 'Learn More',
            imageUrl: 'https://drive.google.com/file/d/17o3sgN_A6GKPwgZsEpneBYODhRs9tKga/view?usp=sharing'
        },
        {
            _id: 5,
            companyId: 9,
            primaryText: "Visit Valentino.com, discover the new products and shop now!",
            headline: "Valentino Hexagonal Metal Frame With Crystal Studs",
            description: "",
            CTA: 'Shop Now',
            imageUrl: 'https://drive.google.com/file/d/17sz2UuPNcoHXz-U27EYcwmhkI1ZQUmPZ/view?usp=sharing'
        },
        {
            _id: 6,
            companyId: 11,
            primaryText: "Say ‘goodnight’ to sleeping hot 🔥 with Purple products—designed to dissipate heat.",
            headline: "Cooler Summers Start Here",
            description: "Shop Purple products, designed to help you sleep cool.",
            CTA: "Shop Now",
            imageUrl: 'https://drive.google.com/file/d/17vrlQMchymHqlN35p4os23jYqQjFiUNq/view?usp=sharing'
        },
        {
            _id: 7,
            companyId: 10,
            primaryText: "Dark spots. Breakouts. Rosacea. Dull skin. Fine lines. Our formulas are custom-mixed for YOUR skin concerns.",
            headline: "Personalized skincare for dark spots, acne, and more.",
            description: "Personalized skincare for dark spots, acne, and more. Results may vary.",
            CTA: "Order Now",
            imageUrl: "https://drive.google.com/file/d/17vzdu8jSulXgzk9rkJaHP7W1940pQaAV/view?usp=sharing"
        },
    ]

    // var result = await Ads.insertMany(data);
    res.json(data);
})

app.get('/search', async (req, res) => {
    console.log({search: req.query.search})
    res.json(await getCompanyData(req.query.search))
})

app.get('/', async (_, res) => {
    res.json('Home Page')
})

async function getCompanyData(search = null) {
    var match = {}
    if(search) {
        const regex = new RegExp(escapeRegex(search), 'gi');
        console.log(regex)
        match = {
            $or: [
                {
                    'name': regex
                },
                {
                    'company.primaryText': regex
                },
                {
                    'company.headline': regex
                },
                {
                    'company.description': regex
                },
                {
                    'company.CTA': regex
                }
            ]
        }
    }
    var result = await Company.aggregate([
        {
            $lookup: {
                from: 'ads',
                foreignField: 'companyId',
                localField: '_id',
                as: 'company'
            }
        },  
        {
            $unwind: '$company'
        },
        {
            $match: match
        },
    ])

    return result;
}

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

const PORT = process.env.PORT ?? 5000;

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT)
})

// For https

// https.createServer({
//     key: fs.readFileSync("./keys/key.pem"),
//     cert: fs.readFileSync("./keys/cert.pem"),
// },app).listen(PORT, () => {
//     console.log('Server is running on port ' + PORT)
// })
