import { db } from "../../libs/db.js";
import {
  getJudge0LanguageId,
  submitBatch,
  pollBatchResults,
  getLanguageName,
} from "../../libs/judge0.libs.js";

export const createProblem = async (req, res) => {
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
    const allowedDifficulties = ["EASY", "MEDIUM", "HARD"];
    if (!allowedDifficulties.includes(difficulty)) {
      return res
        .status(400)
        .json({ error: "Invalid difficulty level provided." });
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

export const getAllProblems = async (req, res) => {
  try {
    const problems = await db.problem.findMany();
    if (!problems) {
      return res.status(404).json({
        error: "No problem found",
      });
    }

    res.status(201).json({
      success: "true",
      message: "Problems Fetch Successfully",
      problems,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Error while Fetching Problems",
    });
  }
};
export const getProblemById = async (req, res) => {
  const { id } = req.params;
  try {
    // const problem = await db.findUnique({
    //   where: {
    //     id,
    //   },
    // });

    // if (!problem) {
    //   return res.status(404).json({
    //     error : "Problem not found"
    //   })
    // }

   const problem = await db.problem.findUnique({
      where: { id },
    });

    if (!problem) {
      return res.status(404).json({
        success: false,
        error: "Problem not found",
      });
    }


    return res.status(200).json({
      success : true,
      message : "Problem found successfully",
      problem
    })

  } catch (error) {
  console.error(error)
  return res.status(500).json({
    error : "Error while fetching problem by id "
  })

  }
};
export const updateProblem = async (req, res) => {
  try {

    const { id } = req.params; 

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

    const existingProblem = await db.problem.findUnique({
      where: { id },
    });

    if (!existingProblem) {
      return res.status(404).json({
        success: false,
        error: "Problem not found",
      });
    }

    
    const updatedProblem = await db.problem.update({
      where: { id },
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
      },
    });

    return res.status(200).json({
      success: true,
      message: "Problem updated successfully",
      problem: updatedProblem,
    });
  } catch (error) {
    console.log("Update Error:", error);
    return res.status(500).json({
      success: false,
      error: "Error while updating problem",
    });
  }
};

export const deleteProblem = async (req, res) => {
  
  const {id} = req.params
  const existingProblem = await db.problem.findUnique({
    where : {
      id
    }
  })
  try {

    if (!existingProblem) {
      return res.status(404).json({
        error : "Problem not found"
      })
    }

    await db.problem.delete({
      where :{
        id
      }
    })

    res.status(200).json({
      success : true,
      message : "Problem delete successfully"
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({
      error : "Error when problem delete"
    })
  }
};
export const getAllProblemsSolvedByUser = async (req, res) => {
  
};
