const plantaModel = require('../models/planta.model');


const getAllPlantas = async (req, res) => {
  try {
    const plantas = await plantaModel.getAllPlantas();
    res.status(200).json(plantas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las plantas' });
  }
};


const getPlantaUni = async (req, res) => {
  try {
    const id = req.params.id;
    const planta = await plantaModel.getPlantaById(id);
    
    if (planta) {
      console.log(planta)
      res.status(200).json(planta);
      
    } else {
      console.log("planta no ecnotrada")
      res.status(404).json({ error: 'Planta no encontrada' });
    }
  } catch (error) {
    console.log("werror ")
    res.status(500).json({ error: 'Error al obtener la planta' });
  }
};



module.exports = {
    getAllPlantas,
    getPlantaUni,

};
