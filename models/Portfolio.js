const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
        maxLength: [40, 'Title cannot be more than 40 characters']
    },
    description: {
        type: String,
        required: true,
        maxLength: [200, 'Description cannot be more than 200 characters']
    }
})

module.exports = mongoose.models.Portfolio || mongoose.model('Portfolio', PortfolioSchema);