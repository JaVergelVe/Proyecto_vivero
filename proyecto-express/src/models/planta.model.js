const pool = require('../db/connection.js'); 

const getAllPlantas = async () => {
    const result = await pool.query(`
      SELECT p.*, e.name AS nombre_especie
      FROM vivero.plant AS p
      JOIN vivero.specie AS e ON p.specie_id_specie = e.id_specie
    `);
    return result.rows;
  };

const getPlantaById = async (id) => {
   const result = await pool.query(`SELECT * from vivero.plant p 
    inner join vivero.specie s
    on(p.specie_id_specie = s.id_specie)
     WHERE id_plant = $1`, [id]);
  return result.rows[0];
};
  
module.exports = {
  getAllPlantas,
  getPlantaById
};
