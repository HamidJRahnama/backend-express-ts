import type { Request, Response } from "express";
import { Router } from "express";
import { authMiddleware } from "../middlewares/index.ts";
// import { deleteUser, getAllUsers, getUser, postUser, putUser } from "./usersServices.ts";
import UsersCreateDto from "./dtos/usersCreateDto.ts";
import validationMiddleware from "../middlewares/validateMiddleware.ts";
import type User from "./dtos/userDto.ts";
import { createUser, deleteUserById, getAllUsers, getUserById, updateUser } from "./usersServices.ts";

const router = Router()
router.use(authMiddleware);


// GET all users
router.get("/", async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers();
        res.send(users);
    } catch (err) {
        res.status(500).send({ message: "Internal server error", error: err });
    }
});


// GET user by id
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const user = await getUserById(req.params.id as string);
        res.send(user);
    } catch (err: any) {
        if (err.message === "UserNotFound") {
            return res.status(404).send({ message: "User not found" });
        }
        res.status(500).send({ message: "Internal server error", error: err });
    }
});



// POST new user
router.post("/", validationMiddleware(UsersCreateDto), async (req: Request, res: Response) => {
    try {
        const newUser = await createUser(req.body);
        res.status(201).send(newUser);
    } catch (err) {
        res.status(500).send({ message: "Internal server error", error: err });
    }
});


// PUT update user
router.put("/:id", async (req: Request, res: Response) => {
    try {
        const updatedUser = await updateUser(req.params.id as string, req.body);
        res.send(updatedUser);
    } catch (err: any) {
        if (err.message === "UserNotFound") {
            return res.status(404).send({ message: "User not found" });
        }
        res.status(500).send({ message: "Internal server error", error: err });
    }
});


// DELETE user
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const deletedUser = await deleteUserById(req.params.id as string);
        res.send(deletedUser);
    } catch (err: any) {
        if (err.message === "UserNotFound") {
            return res.status(404).send({ message: "User not found" });
        }
        res.status(500).send({ message: "Internal server error", error: err });
    }
});


export default router