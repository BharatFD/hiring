import  mongoose from 'mongoose';


const faqSchema = new mongoose.Schema({
    question: {
        type: String, 
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    translations: {
        hi: {
            question: {type: String},
            answer: {type: String}
        },
        bn: {
            question: {type: String},
            answer: {type: String},
        },
        mr: {
            question: {type: String},
            answer: {type: String},
        }
    }
})

export const faqModel = mongoose.model("FAQ", faqSchema);

