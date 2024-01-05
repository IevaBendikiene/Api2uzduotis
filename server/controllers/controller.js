import Beer from '../models/beerModel.js'
import mongoose from 'mongoose'

export const getBeers = async (req, res) =>{
    const beers = await Beer.find({}).sort({likes: -1})
    res.status(200).json(beers)
}
export const getBeer = async (req, res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Tokio alaus nera"})
    }
    const beer = await Beer.findById(id)
    if(!beer){
        return res.status(404).json({error: 'Tokio alaus nera.'})

    }
    res.status(200).json(beer)
}
 export const createBeer = async (req, res) => {
    const{brand, title, type, choice, likes} = req.body
    let emptyFields = []
    if (!brand){emptyFields.push('brand')}
    if (!title){emptyFields.push('title')}
    if(emptyFields.length > 0) {
        return res.status(400).json({error: 'Prasome uzpildyt visus laukelius', emptyFields})
    }
    try{
        const beer = await Beer.create({brand, title, type, choice, likes})
        res.status(200).json(beer)
    } catch(error){
        res.status(400).json({error: error.message})
    }
   
}

export const updateBeer = async(req, res) => {
    const {id} = req.params
    const {likes} = req.body
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({erorr: 'Tokio alaus nera'})
    }
    const beer = await Beer.findOneAndUpdate({_id:id},{$set:{likes:likes}},{new: true})
    if(!beer) {
        return res.status(404).json({error: ''})
    }
    res.status(200).json(beer)
}

export const removeBeer = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({erorr: 'Tokio alaus nera'})
    }
    const beer = await Beer.findByIdAndDelete({_id: id})
    if(!beer) {
        return res.status(404).json({error:'Tokio alaus nera.'})
    }
    res.status(200).json(beer)
}