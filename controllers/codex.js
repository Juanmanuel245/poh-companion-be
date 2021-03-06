const { response } = require('express');
const Codex = require('../models/Codex');


const createCodex = async (req, res = response) =>{
    const { title, author, source, link, meta } = req.body;


    const codexExists = await Codex.findOne({ title, author, source });

    if ( codexExists ){
        return res.status(400).json({
            ok: false,
            msg: 'Ya existe el instructivo en el sistema.'
        }) 
    }

    try {
        codex = new Codex( req.body );
        
        codex.user = req.uid;
        await codex.save();

        return res.status(201).json({
            ok: true,
        })


    } catch (error) {
        console.log(error); 
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador.'
        })      
    }
    
};

const getCodexByMeta = async (req, res = response) =>{
    const { question } = req.body;
    let instructivosDisponibles = [];
    const instructivos = await Codex.find();

    console.log('question: ', question);
    console.log('instructivos: ', instructivos);


    instructivos.forEach(i => {
        let metas = i.meta.split(',');
        let instructivoRelacionado = false;

        metas.forEach(m => {
            if(question.includes(m)){
                
                instructivoRelacionado = true;
            } 
        });

        if(instructivoRelacionado){
            instructivosDisponibles.push(i);
        }
        
    });
    
    return res.json({
        ok: true,
        instructivosDisponibles
    });
};

const getCodex = async (req, res = response) =>{

    console.log('ENTRE');
    console.log('codexId: ', req.params);
    const codexId = req.params.id;

    try {
        const codex = await Codex.findById( codexId ).populate('user');

        if ( !codex ){
            return res.status(404).json({
                ok: false,
                msg: 'El codex no existe.'
            });
        }

        return res.json({
            ok: true,
            codex
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador.'
        });
    }

};

const addVoteCodex = async (req, res = response) =>{

    const codexId = req.params.id;
    const type = req.body.type;
    let codexActualizado;

    try {
        const codex = await Codex.findById( codexId ).populate('user');

        if ( !codex ){
            return res.status(404).json({
                ok: false,
                msg: 'El codex no existe.'
            });
        }

        if(type === 'positive'){
            codexActualizado = await Codex.findByIdAndUpdate( codexId, { positive_vote : codex.positive_vote + 1}, { new: true } );
        }else if(type === 'negative'){
            codexActualizado = await Codex.findByIdAndUpdate( codexId, { negative_vote : codex.negative_vote + 1}, { new: true } );
        }

        return res.json({
            ok: true,
            codexActualizado
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador.'
        });
    }

};

const addVisitCodex = async (req, res = response) =>{

    const codexId = req.params.id;

    try {
        const codex = await Codex.findById( codexId ).populate('user');

        if ( !codex ){
            return res.status(404).json({
                ok: false,
                msg: 'El codex no existe.'
            });
        }
        const codexActualizado = await Codex.findByIdAndUpdate( codexId, { visits : codex.visits + 1}, { new: true } );

        return res.json({
            ok: true,
            codexActualizado
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador.'
        });
    }

};

const getCodexes = async (req, res = response) =>{

    try {
        const codexes = await Codex.find().populate('user');


        return res.json({
            ok: true,
            codexes
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador.'
        });
    }

};


module.exports = {
    createCodex,
    getCodexByMeta,
    getCodex,
    getCodexes,
    addVisitCodex,
    addVoteCodex
}