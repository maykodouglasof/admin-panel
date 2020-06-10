import * as Yup from "yup";
import { Op } from "sequelize";

import User from "../models/User";

class UserController {
  async index(req, res) {
    const { page = 1, q = "" } = req.query;
    const name = q || "";

    const { docs, pages, total } = await User.paginate({
      where: { name: { [Op.iLike]: `%${name}%` } },
      attributes: ["id", "name", "email", "admin"],
      order: [["created_at", "DESC"]],
      paginate: 10,
      page,
    });

    if (!docs) {
      return res.status(401).json({ error: "Users not found" });
    }

    return res.json({ docs, page, pages, total });
  }

  async show(req, res) {
    const users = await User.findByPk(req.params.id, {
      attributes: ["id", "name", "email", "admin"],
    });

    if (!users) {
      return res.status(401).json({ error: "Users not found" });
    }

    return res.json(users);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Field validation fails" });
    }

    const userExists = await User.findOne({
      where: { email: req.body.email },
    });

    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const { id, name, email, admin } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      admin,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when("oldPassword", (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when("password", (password, field) =>
        password ? field.required().oneOf([Yup.ref("password")]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Field validation fails" });
    }

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.params.id);

    if (email && email !== user.email) {
      const userExists = await User.findOne({
        where: { email: req.body.email },
      });

      if (userExists) {
        return res.status(400).json({ error: "User already exists" });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: "Old passoword does not match" });
    }

    const { id, name, admin } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      admin,
    });
  }

  async delete(req, res) {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    await user.destroy(user);

    return res.json({ message: `User ${user.name} deleted with success` });
  }
}

export default new UserController();
