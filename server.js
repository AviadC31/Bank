const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const express = require('express')
const path = require('path')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 7000
const transactionSchema = new mongoose.Schema({
    amount: Number,
    category: String,
    vendor: String
})
const Transaction = mongoose.model("Transaction", transactionSchema)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/bankapp',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});


app.get('/transactions-api', (req, res) => {
    Transaction.find({}).then(transactions => res.send(transactions))
})

app.get('/statistics-api', (req, res) => {
    Transaction.aggregate(
        [
            {
                $group: {
                    _id: "$category",
                    total: {
                        $sum: "$amount"
                    },
                },
            }
        ]
    ).sort({ "total": -1 }).then(statistics => res.send(statistics))
})

app.post('/transaction-api', (req, res) => {
    const transaction = new Transaction(req.body)
    transaction.save().then(transaction => res.send(transaction))
})
app.delete('/transaction-api', function (req, res) {
    const { id } = req.body
    Transaction.findByIdAndDelete(id)
        .then(transaction => res.send(transaction._id))
        .catch(() => res.end())
})
// if(process.env.NODE_ENV === 'production'){
//     app.use(express.static(path.join(__dirname, 'client/build')));

//     app.get('*', (req, res) => {
//         res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
//     });

// }
app.use(express.static(path.join(__dirname, 'client/build')));

app.listen(port, () => console.log("server up and running on port " + port))