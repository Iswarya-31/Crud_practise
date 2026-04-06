import { Router } from "express";
import { getIndexById } from "../utils/middleware.mjs";
import { createUserValidationSchema } from "../utils/ValidationSchema.mjs";
import { validationResult, checkSchema, matchedData } from "express-validator";
import { users } from "../utils/userData.mjs";

const router = Router();

//POST
router.post(
  "/api/users",
  checkSchema(createUserValidationSchema(users)),
  (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({
        error: result.array(),
      });
    }

    const { user_name, age } = matchedData(req);

    const newUser = {
      id: users.length ? users[users.length - 1].id + 1 : 1,
      user_name,
      age,
    };

    users.push(newUser);

    return res.status(201).json({
      message: "New User Created",
      user: newUser,
    });
  },
);

//PUT
router.put("/api/users/:id", getIndexById, (req, res) => {
  const { user_name, age } = req.body;
  const index = req.index;
  const id = Number(req.params.id);

  if (user_name == undefined || age == undefined) {
    return res.status(400).json({ message: "All fields are required" });
  }

  users[index] = {
    id,
    user_name,
    age,
  };

  const updatedUser = users[index];

  return res.status(200).json({
    message: "User Updated successfully",
    user: updatedUser,
  });
});

//PATCH
router.patch("/api/users/:id", getIndexById, (req, res) => {
  const { user_name, age } = req.body;
  const index = req.index;

  users[index] = {
    ...users[index],
    ...(user_name !== undefined && { user_name }),
    ...(age !== undefined && { age }),
  };

  const updatedUser = users[index];

  return res.status(200).json({
    message: "User Updated successfully",
    user: updatedUser,
  });
});

//GET
router.get("/", (req, res) => {
  return res.status(200).json({ message: "Hello World" });
});

router.get("/api/allUsers", (req, res) => {
  return res.status(200).json(users);
});

router.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json(user);
});

router.get("/api/users", (req, res) => {
  const { filter, value, sort, order, page, limit } = req.query;

  let result = [...users];

  if (filter && value) {
    const allowedFilters = ["user_name", "age"];

    if (!allowedFilters.includes(filter)) {
      return res.status(400).json({ message: "Invalid Filter" });
    }

    if (filter === "age") {
      result = result.filter((user) => user.age === Number(value));
    } else {
      result = result.filter((user) =>
        user.user_name.toLowerCase().includes(value.toLowerCase()),
      );
    }
    if (result.length === 0) {
      return res
        .status(404)
        .json({
          message: "No results found for your search...Try adjusting it.",
        });
    }
  }

  if (sort) {
    const allowedSortFields = ["user_name", "age"];

    if (!allowedSortFields.includes(sort)) {
      return res.status(400).json({ message: "Invalid sort field" });
    }

    const desc = order === "desc";

    if (sort === "age") {
      result = [...result].sort((a, b) =>
        desc ? b.age - a.age : a.age - b.age,
      );
    }
    if (sort === "user_name") {
      result = [...result].sort((a, b) =>
        desc
          ? b.user_name.localeCompare(a.user_name)
          : a.user_name.localeCompare(b.user_name),
      );
    }
    if (result.length === 0) {
      return res
        .status(404)
        .json({
          message: "No results found for your search...Try adjusting it.",
        });
    }
  }

  if (page && limit) {
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 5;

    if (pageNum < 1 || limitNum < 1) {
      return res.status(400).json({ message: "Invalid pagination values" });
    }

    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = pageNum * limitNum;

    const paginatedResult = result.slice(startIndex, endIndex);

    if (result.length === 0) {
      return res
        .status(404)
        .json({
          message: "No results found for your search...Try adjusting it.",
        });
    }

    return res.status(200).json({
      total: result.length,
      page: pageNum,
      limit: limitNum,
      data: paginatedResult,
    });
  }
  return res.status(200).json(result);
});

//DELETE
router.delete("/api/users/:id", getIndexById, (req, res) => {
  const index = req.index;

  const deletedUser = users.splice(index, 1)[0];

  return res.status(200).json({
    message: "User Deleted successfully",
    user: deletedUser,
  });
});

export default router;
