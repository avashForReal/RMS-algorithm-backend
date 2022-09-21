const departmentService = require("../service/department.service");

const departmentController = {
  add: async (req, res) => {
    try {
      const dataToSave = await departmentService.create(req.body);
      res.status(200).json(dataToSave);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const data = await departmentService.getAll();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getByID: async (req, res) => {
    try {
      const data = await departmentService.getByID(req.params.id);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const result = await departmentService.update(req.params.id, req.body);

      res.send(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  delete: async (req, res) => {
    console.log(req.params.id);
    try {
      const departmentInDB = await departmentService.delete(req.params.id);
      return res.status(200).json({ message: "deleted" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  // TODO: addSubject
  // TODO: removeSubject
};

module.exports = departmentController;
