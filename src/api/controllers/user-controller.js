import {
    addUser,
    listAllUsers,
    findUserById,
    updateUser,
    removeUser,
  } from '../models/user-model.js';
  import bcrypt from 'bcrypt';
  
  const getUser = async (req, res) => {
    const users = res.json(await listAllUsers());
    if (!users) {
      res.sendStatus(404);
      return;
    }
    res.json(users);
  };
  
  const getUserById = async (req, res) => {
    const user = await findUserById(req.params.id);
    if (!user) {
      res.sendStatus(404);
      return;
    }
    res.json(user);
  };
  
  const postUser = async (req, res, next) => {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
  
    try {
  
      const result = await addUser(req.body);
      if (!result) {
        const error = new Error(":D")
        error.status = 400
        next(error);
        return;
      }
      res.status(201);
      res.json(result);
    } catch (error) {
      next(error)
    }
  };
  
  const putUser = async (req, res) => {
    if (
      res.locals.user.user_id !== Number(req.params.id) &&
      res.locals.user.role !== 'admin'
    ) {
      res.sendStatus(403);
      return;
    }
  
    const result = await updateUser(req.body, req.params.id);
    if (!result) {
      res.sendStatus(400);
      return;
    }
    res.json(result);
  };
  
  const deleteUser = async (req, res) => {
    if (
      res.locals.user.user_id !== Number(req.params.id) &&
      res.locals.user.role !== 'admin'
    ) {
      res.sendStatus(403);
      return;
    }
    const result = await removeUser(req.params.id);
    if (!result) {
      res.sendStatus(400);
      return;
    }
    res.json(result);
  };
  
  export { getUser, getUserById, postUser, putUser, deleteUser };