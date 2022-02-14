const mongoose=require('mongoose')
const Schema=mongoose.Schema

const teamSchema=new Schema({
    allow_add_number: {
        type: Boolean,
        required: true,
        default: false
    },
    email_to_contact: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        default: null
    },
    link_submission: {
        type: String,
        default: null
    },
    fee_status: {
        type: Boolean,
        required: true,
        default: false
    }
})


const Team=mongoose.model('Team', teamSchema)
module.exports=Team




