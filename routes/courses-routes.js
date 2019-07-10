const express = require('express')
const router = express.Router();

const { allCourses, course, lesson } = require('../controllers/courses-controller')

router.get('/', allCourses)
router.get('/course/:id', course)
router.get('/lesson/:id', lesson)

module.exports = router