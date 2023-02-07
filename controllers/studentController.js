const Student = require('../models/Student')

async function getAllStudents(req, res){
    try{
        let doc = await Student.find();
        console.log("-Loading all students");
        res.send(doc);
    }catch(err){
        res.send("Error: " + err);
    }
}

async function addStudent(req, res){
    let newDoc = new Student(req.body);
    try{
        await newDoc.save();
        console.log("-Document added successfully.");
        res.redirect('back')
    }catch(err){
        res.send('Error: ' + err)
    }
}

async function deleteStudent(req, res){
    let id = req.body.id;
    try{
        await Student.findByIdAndDelete(id);
        console.log("-Document of ID " + id + " deleted successfully.");   
        res.redirect('back')  
    }catch(err){
        res.send('Error: ' + err)
    }
}

async function loadStudent(req, res) {
    let id = req.params.id;
    try{
        let doc = await Student.findById(id);
        res.send(doc);
    }catch (error) {
        res.send("Error: " + error);
    }
}

async function editStudent(req, res) {
    let doc = {
        id: req.body.id,
        name: req.body.name,
        testOne: req.body.testOne,
        testTwo: req.body.testTwo,
        works: req.body.works,
    }
    try {
        await Student.findByIdAndUpdate(doc.id, doc);
        console.log("-Document of ID " + doc.id + " edited successfully.");
        res.redirect('back') 
    } catch (err) {
        res.send("Error: " + err);
    }
}

module.exports = { getAllStudents, addStudent, deleteStudent, loadStudent, editStudent }