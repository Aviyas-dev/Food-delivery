import { Request, Response, Router } from "express";
import { UserModel } from "../models/user";

export const userRouter = Router();

userRouter.get("/", async (req: Request, res: Response) => {
    const users = await UserModel.find();
    res.json(users);
});

userRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req.params;
    const user = await UserModel.find({ _id: id });
    res.json(user);
});

userRouter.put("/:_id", async (req: Request, res: Response) => {
    const { params, body } = req;
    const userId = params._id;
    const user = await UserModel.find({ _id: userId });
    const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { ...user, ...body },
        { new: true }
    );
    res.json(updatedUser);
});

userRouter.post("/", async (req: Request, res: Response) => {
    const { body } = req;
    await UserModel.create({
        ...body,
    });
    const users = await UserModel.find();

    res.json(users);
});

userRouter.delete("/:_id", async (req: Request<{ id: string }>, res: Response) => {
    const userId = req.params.id;
    const deletedUser = await UserModel.findByIdAndDelete(userId);
    res.json("Deleted: " + deletedUser);
});