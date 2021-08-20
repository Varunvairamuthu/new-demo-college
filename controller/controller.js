//const schools=require('../model/model');
const schoolmodel=require('../model/model')



exports.getschoolsf=async(req,res,next)=>{
    let query;
    const reqQuery ={...req.query};
    const removeFields =['select','sort','page','limit'];
    removeFields.forEach(param=>delete reqQuery[param]);
    console.log(reqQuery);
     let queryStr = JSON.stringify(reqQuery);
     queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match=>`$${match}`);
    query =schoolmodel.find(JSON.parse(queryStr));
    if(req.query.select){
        const fields = req.query.select.split(',').join(' ');
        console.log(fields);
        query = query.select(fields);
    }
    const page = parseInt(req.query.page,10) ||1;
    const limit = parseInt(req.query.limit,10) ||1;
    const startIndex =(page-1) * limit;
    const endIndex =page*limit;
    const total = await schoolmodel.countDocuments();
    query=query.skip(startIndex).limit(limit);
        const school =await query; 
        const pagination={};
        if(endIndex<total){
            pagination.limit={
                page:page+1,
                limit 
            }
        }
        if(startIndex>0){
            pagination.prev={
                page:page-1,
                limit  
            }
        }
        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        }else{
            query =query.sort('-createdAt');
        }
        res.status(200)
        .json({ success:true,count:schoolmodel.length,pagination, data:schoolmodel});
    
};

exports.postschools=async(req,res,next)=>{
    try{
        const schoolmodel=await schoolmodel.create(req.body);
        res.status(200).json({success:true,data:schoolmodel});
    }
    catch(err){
            res.status(400).json({success:false,error:err});
        }   
};
exports.getschools=async(req,res,next)=>{
   
    try{
        const schoolmodel=await schoolmodel.findById(req.params.id);
     
       res.status(200).json({success:true,count:schoolmodel.length,data:schoolmodel});
    }
    catch(err){
            res.status(400).json({success:false,error:err});
        }   
};

exports.putschools=async(req,res,next)=>{
    try{
        const schoolmodel=await schoolmodel.findByIdAndUpdate(res.params.id,req.body,{
            new: true,
            runValidators:true
        });
        if(!schoolmodel){
            return res.status(400).json({success:false}); 
         } 
        res.status(200).json({success:true,data:schoolmodel});
    }
    catch(err){
            res.status(400).json({success:false,error:err});
        }   
};

exports.deleteschools=async(req,res,next)=>{
    try{
        const schoolmodel=await schoolmodel.findByIdAndDelete(res.params.id);
        if(!schoolmodel){
            return res.status(400).json({success:false}); 
         } 
        res.status(200).json({success:true,data:deleted});
    }
    catch(err){
            res.status(400).json({success:false,error:err});
        }   
};