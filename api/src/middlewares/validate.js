const validate = (req, res, next) => {
    const { name, description, platforms, background_image } = req.body;
    if(!name) return res.status(400).json({ error: "Falta el nombre"})
    if(!description) return res.status(400).json({ error: "Falta la descripcion"})
    if(!platforms) return res.status(400).json({ error: "Faltan las plataformas"})
    if(!background_image) return res.status(400).json({ error: "Falta definir una imagen"})
    next();
}

module.exports = { validate}