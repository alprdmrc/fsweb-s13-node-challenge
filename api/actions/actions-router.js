// "eylem" routerını buraya yazın
const router = require("express").Router();
const actionsModel = require("./actions-model");
const { validateActionId, validateActionBody } = require("./actions-middlware");

router.get("/", async (req, res, next) => {
  try {
    const actions = await actionsModel.get();
    res.json(actions);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", validateActionId, (req, res, next) => {
  try {
    res.json(req.currentAction);
  } catch (error) {
    next(error);
  }
});

router.post("/", validateActionBody, async (req, res, next) => {
  try {
    const { project_id, description, notes, completed } = req.body;
    const insertedAction = await actionsModel.insert({
      project_id: project_id,
      description: description,
      notes: notes,
      completed: completed,
    });
    res.status(201).json(insertedAction);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:id",
  validateActionId,
  validateActionBody,
  async (req, res, next) => {
    try {
      const { project_id, description, notes, completed } = req.body;
      const updatedAction = await actionsModel.update(req.params.id, {
        project_id: project_id,
        description: description,
        notes: notes,
        completed: completed,
      });
      res.json(updatedAction);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", validateActionId, async (req, res, next) => {
  try {
    await actionsModel.remove(req.params.id);
    res.json(204).json({ message: "Kayit silindi" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
