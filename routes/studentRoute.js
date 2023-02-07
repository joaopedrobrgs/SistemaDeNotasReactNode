const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const methodOverride = require("method-override");
const studentController = require('../controllers/studentController')

router.use(methodOverride('_method'));

//GETTING ALL STUDENTS:
router.get("/all", studentController.getAllStudents)

//GETTING EDIT PAGE:
router.get("/edit/:id", studentController.loadStudent);

//ADDING NEW STUDENT:
router.post("/", bodyParser.urlencoded({ extended: true }), studentController.addStudent)

//DELETING STUDENT:
router.delete("/", bodyParser.urlencoded({ extended: true }), studentController.deleteStudent)

//EDITING STUDENT:
router.put("/", bodyParser.urlencoded({ extended: true }), studentController.editStudent)

module.exports = router;