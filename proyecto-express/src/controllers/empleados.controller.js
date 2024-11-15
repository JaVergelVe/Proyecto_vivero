const empleadoModel = require('../models/empleado.model');


const getAllEmpleados = async (req, res) => {
  try {
    const empleados = await empleadoModel.getAllEmpleados();
    res.status(200).json(empleados);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los empleados' });
  }
};


const getEmpleadoUni = async (req, res) => {
  try {
    const id_empleado = req.params.id;
    const empleado = await empleadoModel.getEmpleadoById(id_empleado);
    if (empleado) {
      res.status(200).json(empleado);
    } else {
      res.status(404).json({ error: 'Empleado no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el empleado' });
  }
};

const postEmpleado = async (req, res) => {
  try {
   
    const { primerNombre, segundoNombre, primerApellido,
       segundoApellido, email, password, role } = req.body;
    const nuevoEmpleado = {
      primerNombre,
      segundoNombre,
      primerApellido,
      segundoApellido,
      email,
      password,
      role
    };
    const empleado = await empleadoModel.createEmpleado(nuevoEmpleado);
    res.status(201).json(empleado);
  } catch (error) {
    console.error('Error al crear el empleado:', error);
    res.status(500).json({ error: 'Error al crear el empleado' });
  }
};



const putEmpleado = async (req, res) => {
  try {
    const id_empleado = req.params.id;
    const empleadoData = req.body;
    const empleado = await empleadoModel.updateEmpleado(id_empleado, empleadoData);
    if (empleado) {
      res.status(200).json(empleado);
    } else {
      res.status(404).json({ error: 'Empleado no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el empleado' });
  }
};


const deleteEmpleado = async (req, res) => {
  try {
    const id_empleado = req.params.id;
    console.log(id_empleado)
    const empleado = await empleadoModel.deleteEmpleado(id_empleado);
    if (empleado) {
      res.status(200).json(empleado);
    } else {
      res.status(404).json({ error: 'Empleado no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el empleado' });
  }
};

module.exports = {
  getAllEmpleados,
  getEmpleadoUni,
  postEmpleado,
  putEmpleado,
  deleteEmpleado
};
