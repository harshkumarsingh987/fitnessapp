  export const listMine = (Model, sort = { date: -1 }) => async (req, res, next) => {
  try {
    const items = await Model.find({ user: req.user._id }).sort(sort);
    res.json(items);
  } catch (error) {
    next(error);
  }
};

export const createMine = (Model) => async (req, res, next) => {
  try {
    const item = await Model.create({ ...req.body, user: req.user._id });
    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
};

export const updateMine = (Model) => async (req, res, next) => {
  try {
    const item = await Model.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!item) {
      res.status(404);
      throw new Error("Entry not found");
    }

    res.json(item);
  } catch (error) {
    next(error);
  }
};

export const deleteMine = (Model) => async (req, res, next) => {
  try {
    const item = await Model.findOneAndDelete({ _id: req.params.id, user: req.user._id });

    if (!item) {
      res.status(404);
      throw new Error("Entry not found");
    }

    res.json({ message: "Entry deleted", id: req.params.id });
  } catch (error) {
    next(error);
  }
};