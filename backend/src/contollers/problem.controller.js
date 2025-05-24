import {db} from '../../libs/db.js'
import {getJudge0LanguageId , submitBatch ,pollBatchResults ,getLanguageName} from '../../libs/judge0.libs.js'

export const createProblem = async ( req , res ) => {
 const {
    title,
    description,
    difficulty,
    tags,
    examples,
    constraints,
    testcases,
    codeSnippets,
    referenceSolutions,
  } = req.body;
 

  try {
    for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
      const languageId = getJudge0LanguageId(language);

      if (!languageId) {
        return res
          .status(400)
          .json({ error: `Language ${language} is not supported` });
      }

      //
      const submissions = testcases.map(({ input, output }) => ({
        source_code: solutionCode,
        language_id: languageId,
        stdin: input,
        expected_output: output,
      }));

      const submissionResults = await submitBatch(submissions);

      const tokens = submissionResults.map((res) => res.token);

      const results = await pollBatchResults(tokens);

      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        console.log("Result-----", result);
        // console.log(
        //   `Testcase ${i + 1} and Language ${language} ----- result ${JSON.stringify(result.status.description)}`
        // );
        if (result.status.id !== 3) {
          return res.status(400).json({
            error: `Testcase ${i + 1} failed for language ${language}`,
          });
        }
      }
    }
    const allowedDifficulties = ['EASY', 'MEDIUM', 'HARD'];
if (!allowedDifficulties.includes(difficulty)) {
  return res.status(400).json({ error: 'Invalid difficulty level provided.' });
}

    const newProblem = await db.problem.create({
      data: {
        title,
        description,
        difficulty,
        tags,
        examples,
        constraints,
        testcases,
        codeSnippets,
        referenceSolutions,
        userId: req.user.id,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Message Created Successfully",
      problem: newProblem,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Error While Creating Problem",
    });
  }
};

export const getAllProblems = async (req , res) => {
try {
  const problems = await db.problem.findMany();
  if(!problems){
   return res.status(404).json({
    error : "No problem found"
   })
  }

  res.status(201).json({
    success : "true",
    message : "Problems Fetch Successfully",
    problems
  })
} catch (error) {
  console.error(error)
  return res.status(404).json({
    error : "Error while Fetching Problems"
  })
}
}
export const getProblemById = async (req , res) => {

}
export const updateProblem = async (req , res) => {

}
export const deleteProblem = async (req , res) => {

}
export const getAllProblemsSolvedByUser = async (req , res) => {

}

