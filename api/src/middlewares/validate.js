const validate = (req, res, next) => {
    const { name, description, released, rating } = req.body;
    if(!name) return res.status(400).json({ error: "Falta el nombre"})
    if(!description) return res.status(400).json({ error: "Falta la descripcion"})
    if(!released) return res.status(400).json({ error: "Faltan las plataformas"})
    if(!rating) return res.status(400).json({ error: "Falta definir una imagen"})
    next();
}

module.exports = { validate}