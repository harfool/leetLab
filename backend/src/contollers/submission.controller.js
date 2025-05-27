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
    console.error("error" , error)
    res.status(500).json({
        error : "Error while fetching submission"
    })
}
}

export const getSubmissionsForProblem = async () =>{

}

export const getAllTheSubmissionForProblem = async () =>{

}