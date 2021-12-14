const express = require('express');
const router = express.Router();

const Question = require('../models/question')

router.get('/', async (req, res) => {
    
    try {

        const arrayQuestionsDB = await Question.find()
        console.log(arrayQuestionsDB)

        res.render("blog", {
        arrayQuestions:arrayQuestionsDB
        
    })

    } catch (error) {
        console.log(error);
    }
    
    
})

router.get('/preguntar', (req, res) => {
    res.render('preguntar')
})

router.post('/', async (req, res) => {
    const body = req.body
    try {
        
        await Question.create(body)

        res.redirect('/blog')
    } catch (error) {
        console.log(error);
    }
})

router.get('/:id', async (req, res) => {
    
    const _id = req.params.id
    
    try {
        
        const questionDB = await Question.findOne({_id})
        
        res.render('discusion',{
            question:questionDB,
            error: false
        })

    } catch (error) {

        res.render('discusion',{
            error: true,
            message: 'Id no válido'
        })

    }
})

router.put('/:id', async (req, res) => {
    
    const _id = req.params.id
    const body = req.body


    try {
        
        const questionDB = await Question.findByIdAndUpdate(
            _id, body, { useFindAndModify: false}
        )

    } catch (error) {
        console.log(error)
    }
})

module.exports = router;