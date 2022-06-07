const listRouter = require("express").Router();
const { check } = require("express-validator");

const auth = require("../../middleware/auth");
const listsController = require("../../controllers/lists_controller");

listRouter.use("/:listId$", auth, listsController.listParams);

// CREATE list of movies
listRouter.post(
  "/",
  auth,
  [
    check("title").not().isEmpty(),
    check("type").not().isEmpty(),
    check("genre").not().isEmpty(),
    check("content").not().isEmpty(),
  ],
  listsController.createList
);

// GET ALL MOVIES
listRouter.get("/", auth, listsController.getAllLists);

// DELETE
listRouter.delete("/:listId", auth, listsController.deleteList);

module.exports = listRouter;
