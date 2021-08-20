const express = require('express');
const{getschools,putschools,postschools,deleteschools,getschoolsf}=require('../controller/controller');

const router = express.Router();

router.get('/',getschools);
router.get('/',getschoolsf);
router.put('/:id',putschools);
router.post('/',postschools);
router.delete('/:id',deleteschools);

module.exports=router;