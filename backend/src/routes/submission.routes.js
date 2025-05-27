import express from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { getAllSubmission,
     getAllTheSubmissionForProblem,
     getSubmissionsForProblem

 } from '../contollers/submission.controller.js'

const submissionRoute = express.Router()

submissionRoute.get("/get-all-submission" , authMiddleware , getAllSubmission)
submissionRoute.get("/get-submission/:problemId" , authMiddleware , getSubmissionsForProblem)
submissionRoute.get("/get-submission-count/:problemId" , authMiddleware , getAllTheSubmissionForProblem)

export default submissionRoute