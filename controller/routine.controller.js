const routineService = require("../service/routine.service");

const routineController = {
  add: async (req, res) => {
    try {
      const dataToSave = await routineService.create(req.body);
      res.status(200).json(dataToSave);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const data = await routineService.getAll();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getByID: async (req, res) => {
    try {
      const data = await routineService.getByID(req.params.id);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const result = await routineService.update(req.params.id, req.body);

      res.send(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const routineInDB = await routineService.delete(req.params.id);
      return res.status(200).json({ message: "deleted" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

module.exports = routineController;
