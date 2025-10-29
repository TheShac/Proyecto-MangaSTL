import axios from 'axios';

const API_URL = 'http://localhost:3000/api/employees';

export const EmployeeService = {
  async getById(uuid) {
    return axios.get(`${API_URL}/${uuid}`);
  },

  async update(uuid, employeeData) {
    return axios.put(`${API_URL}/${uuid}`, employeeData);
  },

  async delete(uuid) {
    return axios.delete(`${API_URL}/${uuid}`);
  }
};

export const getAllEmployees = async (token) => {
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createEmployee = async (employeeData, token) => {
  const response = await axios.post(API_URL, employeeData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
