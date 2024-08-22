import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function registrar(req, res) {
  try {
    const { title, description } = req.body;

    // Verifique se title está presente
    if (!title) {
      return res.status(400).json({ message: "O título é obrigatório" });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        userId: req.user.id,
      },
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function listar(req, res) {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId: parseInt(req.params.id),
      },
    });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function listarMeusTasks(req, res) {
  try {
    console.log("req.user:", req.user);
    const tasks = await prisma.task.findMany({
      where: {
        userId: req.user.id,
      },
    });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export default {
  registrar,
  listar,
  listarMeusTasks,
};
