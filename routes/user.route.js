import express from "express";
import {getUsers, createUser, updateUser, deleteUser} from "../controllers/user.controller.js";

const router = express.Router();

router.get('/', getUsers);

router.post('/', createUser);

router.put('/', updateUser); //c1
// c2: router.put('/:id', updateUser);

router.delete('/', deleteUser); //c1
// c2: router.delete('/:id', deleteUser);

export default router;