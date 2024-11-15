const pool = require('../db/connection.js'); 



const getLastEmployeeId = async () => {
  const result = await pool.query('SELECT id_employee FROM vivero.employee ORDER BY id_employee DESC LIMIT 1');
  const lastId = result.rows[0] ? parseInt(result.rows[0].id_employee, 10) : 9; 
  return lastId;
};




const getAllEmpleados = async () => {
  const result = await pool.query('SELECT * FROM vivero.employee');
  return result.rows;
};


const getEmpleadoById = async (id_empleado) => {
  const result = await pool.query('SELECT e.name as name_empleado , e.*, j.name as job_name, j.* FROM vivero.employee e inner join vivero.job j on(e.job_id_job = j.id_job) WHERE id_employee = $1', [id_empleado]);
  return result.rows[0];
};


const createEmpleado = async (nuevoEmpleado) => {
  const { primerNombre, segundoNombre, primerApellido, segundoApellido, email, password, role } = nuevoEmpleado;
  const lastId = await getLastEmployeeId();
  const newId = lastId + 1;

  const result = await pool.query(
    `INSERT INTO vivero.employee 
    (id_employee, name,name_2, last_name, last_name_2, email, password,job_id_job) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [newId,primerNombre, segundoNombre, primerApellido, segundoApellido, email, password, role]
  );

  return result.rows[0];
  
};


const updateEmpleado = async (id_empleado, empleadoData) => {
  const { primerNombre, segundoNombre, primerApellido, segundoApellido, email, password, role } = empleadoData;
  const result = await pool.query(
    'UPDATE vivero.employee SET name = $1, name_2 = $2, last_name = $3, last_name_2 = $4, email = $5, password = $6, job_id_job = $7 WHERE id_employee = $8 RETURNING *',
    [primerNombre, segundoNombre, primerApellido, segundoApellido, email, password, role,id_empleado]
  );
  return result.rows[0];
};

const deleteEmpleado = async (id_empleado) => {
  const result = await pool.query('DELETE FROM vivero.employee WHERE id_employee = $1 RETURNING *', [id_empleado]);
  return result.rows[0];
};

module.exports = {
  getAllEmpleados,
  getEmpleadoById,
  createEmpleado,
  updateEmpleado,
  deleteEmpleado
};
