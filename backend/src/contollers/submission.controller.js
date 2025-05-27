import { db } from "../../libs/db.js"

export const getAllSubmission = async (req , res)=>{
try {
    
    const userId = req.user.id
    const submission = await db.submission.findMany({
        where :{
            userId : userId
        }
    })

    res.status(200).json({
    success : true ,
        message : "Submission fetch successfully",
        submission
    })

} catch (error) {
    console.error("Error in get All Submission " , error)
    res.status(500).json({
        error : "Error while fetching submission"
    })
}
}

export const getSubmissionsForProblem = async (req , res ) =>{
try {
    
        const userId = req.user.id
        const problemId = req.params.problemId
        const submissions = await db.submission.findMany({
            where :{
                userId : userId ,
                problemId : problemId
    
            }
        })
    
        res.status(200).json({
           success : true ,
            message : "Submission problem fetch successfully",
            submissions
        })
    
} catch (error) {
    console.error("Error in get Submissions For Problem" ,error)
    res.status(500).json({
        error : " failed Submission problem fetch "
    })
}
}

export const getAllTheSubmissionForProblem = async (req , res ) =>{
try {
    const problemId = req.params.problemId
    const submission = await db.submission.count({
        where : {
            problemId : problemId
        }

    })
  
    res.status(200).json({
        success : true ,
        message : " Fetch Submission For Problem is Successfully ",
        submission
    })

} catch (error) {
    console.error("error in get All The Submission For Problem" , error)
    res.status(500).json({
        error : "failed to get All The Submission For Problem"
    })
}
}