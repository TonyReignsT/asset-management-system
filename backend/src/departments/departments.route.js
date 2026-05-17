const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const {
    createDepartment,
    getDepartments,
    getDepartmentById
} = require('../departments/departments.controller')



router.post('/', createDepartment)
router.get('/', getDepartments)
router.get('/:id', getDepartmentById)


module.exports = router