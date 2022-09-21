const subjectService = require("../service/subject.service");

const subjectController = {
  add: async (req, res) => {
    try {
      const dataToSave = await subjectService.create(req.body);
      res.status(200).json(dataToSave);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const data = await subjectService.getAll();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getByID: async (req, res) => {
    try {
      const data = await subjectService.getByID(req.params.id);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const result = await subjectService.update(req.params.id, req.body);

      res.send(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const subjectInDB = await subjectService.delete(req.params.id);
      return res.status(200).json({ message: "deleted" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

module.exports = subjectController;
