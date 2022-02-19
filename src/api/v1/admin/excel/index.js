const router = require('express').Router();
const excelController = require('./excel.controller');

router.get('/', excelController.getExcelFile);

module.exports = router;
