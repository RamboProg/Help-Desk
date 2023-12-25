
const { Workflow } = require('../models/issueModel');
exports.getWorkflow = async (req, res) => {
  const { Issue } = req.query;
  try {
    // Use findById to fetch the document by its _id
    const workflow = await Workflow.findById(Issue); // Assuming Issue is the _id value

    if (!workflow) {
      return res.status(404).json({ message: 'Solutions not found' });
    }

    const customWorkflow = workflow.Custom_Workflow;
    res.json({ Custom_Workflow: customWorkflow });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error; Try Again" });
  }
};

exports.createWorkflow = async (req, res) => {
  const { Issue, Custom_Workflow, Sub_Issue_Type } = req.body;
  try {
    const workflow = await Workflow.create({ Issue, Custom_Workflow, Sub_Issue_Type });
    res.status(201).json({ workflow });
  } catch (err) {
    console.error("Error creating workflow:", err); // Log the error details for debugging
    res.status(500).json({ message: "Internal Server Error; Try Again" });
  }

}
exports.deleteWorkflow = async (req, res) => {
  const { issuesid } = req.query; // Destructure the issuesid from req.params
  try {
    const deleted = await Workflow.deleteOne({ _id: issuesid }); // Use _id to match the ObjectId
    if (deleted.deletedCount === 0) {
      return res.status(404).json({ message: 'Workflow not found' });
    }
    if (!deleted) {
      return res.status(404).json({ message: 'Workflow not found' });
    }
    res.status(200).json({ message: 'Workflow deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error; Try Again" });
  }
};

exports.getAllWorkflows = async (req, res) => { 
  try {
    const workflow = await Workflow.find();
    res.json(workflow);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching workflows', error });
  }
}

