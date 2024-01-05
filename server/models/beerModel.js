import mongoose from 'mongoose'


const Schema = mongoose.Schema
const beerSchema = new Schema ({
    brand:{
        type:String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    choice:{
        type: String,
        required: true
    },
    likes:{
        type: Number
    }
})
export default mongoose.model('Beer', beerSchema)