const { Categoria } = require("../models");

// Obtener categoria - paginado - total - populate
const listarCategoria = async (req, res) => {
  try {
    const [total, listado] = await Promise.all([
      Categoria.countDocuments({ estado: true }),
      Categoria.find({ estado: true }).populate("usuario", "nombre"),
    ]);
    res.status(200).json({ total, listado });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Obtenercategoria - populate

const listarCategoriaId = async (req, res) => {
  const id = req.params.id;
  try {
    const unaCategoria = await Categoria.findById(id).populate(
      "usuario",
      "nombre"
    );
    if (!unaCategoria) {
      return res.status(404).json({ error: "No se encuentra la categoria" });
    }
    if (!unaCategoria.estado) {
      return res
        .status(404)
        .json({ error: "No se encuentra la categoria - false" });
    }
    res.status(201).json(unaCategoria);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const crearCategoria = async (req, res) => {
  console.log(req.uid);
  const nombre = req.body.nombre.toUpperCase();

  //Verifica si existe la categoria.
  const categoriaDB = await Categoria.findOne({ nombre });
  if (categoriaDB) {
    return res
      .status(404)
      .json({ message: `La categoria ${nombre} ya existe` });
  }

  //Genera la data a guardar
  const data = {
    nombre,
    usuario: req.uid,
  };

  const categoria = new Categoria(data);
  //Guardar en la base de datos
  await categoria.save();

  res.status(201).json(categoria);
};

// actualizar categoría

const actualizarCategoria = async (req, res) => {
  try {
    const id = req.params.id;
    const { estado, usuario, ...data } = req.body;
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.uid;
    const categoria = await Categoria.findByIdAndUpdate(id, data, {
      new: true,
    }).populate("usuario", "nombre");
    res.status(200).json(categoria);
  } catch (error) {
    res.status(404).json({ error });
  }
};

// borrar categoría - false

const delCategoria = async (req, res) => {
  const id = req.params.id;
  const [cate, resultado] = await Promise.all([
    Categoria.findByIdAndUpdate(id, { estado: false }),
    Categoria.findById(id),
  ]);
  res.status(200).json({
    msg: `Delete ${id} Antes : ${cate.estado} Despues: ${resultado.estado}`,
  });
};

module.exports = {
  listarCategoria,
  crearCategoria,
  listarCategoriaId,
  delCategoria,
  actualizarCategoria,
};
