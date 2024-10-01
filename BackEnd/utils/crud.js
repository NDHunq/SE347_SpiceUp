// controllers/resourceController.js
//const Resource = require('../models/Resource'); // Example model

// Generic create resource function
exports.createResource = (Model) => async (req, res) => {
  try {
    const newResource = new Model(req.body);
    await newResource.save();
    res.status(201).json(newResource);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all resources
exports.getAllResources = (Model) => async (req, res) => {
  try {
    const resources = await Model.find();
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific resource by ID
exports.getResourceById = (Model) => async (req, res) => {
  try {
    const resource = await Model.findById(req.params.id);
    if (!resource) return res.status(404).send('Resource not found');
    res.json(resource);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a specific resource by ID
exports.updateResource = (Model) => async (req, res) => {
  try {
    const resource = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!resource) return res.status(404).send('Resource not found');
    res.json(resource);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a specific resource by ID
exports.deleteResource = (Model) => async (req, res) => {
  try {
    const resource = await Model.findByIdAndDelete(req.params.id);
    if (!resource) return res.status(404).send('Resource not found');
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
