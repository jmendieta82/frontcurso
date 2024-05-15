import axios from "axios";

export const ApiConection = axios.create({
  baseURL:'http://localhost:8000/api/',
  headers:{
    'Authorization': 'Token 64b93f9a38e34999867702a213e531363e81ee93',
    'content-type': 'application/json',
  },
}
)

export const get = async (endpoint:string) => {
  try {
    const response = await ApiConection.get(endpoint);
    return response.data;
  } catch (error) {
    throw new Error(`Se produjo un error al obtener los datos. ${error}`);
  }
};

export const post = async (endpoint:string,data:any) => {
  try {
    const response = await ApiConection.post(endpoint,data);
    return response.data;
  } catch (error) {
    throw new Error(`Se produjo un error al obtener los datos. ${error}`);
  }
};