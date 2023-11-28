// controllers/workflowController.js
const Workflow = require('../models/issueModel');

exports.getWorkflow = async (req, res) => {
    const { Issue } = req.query;

    try {
      const workflow = await Workflow.findOne({ Issue });
  
      if (!workflow) {
        return res.status(404).json({ message: 'Solutins not found' });
      }
  
      const customWorkflow = workflow.Custom_Workflow;
      res.json({ Custom_Workflow: customWorkflow });
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error; Try Again :(" });
    }
};
