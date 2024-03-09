import axios, { AxiosError } from "axios";

export const key = 'yocket';
export const generalURL = `localhost:8080/api/${key}`;


export const authAxios = axios.create({
  baseURL: `http://${generalURL}`,
  headers: {
    "Content-Type": "application/json",
  },
});


export interface StandardAPIResponse {
    status: boolean;
    statusCode: number;
    statusMessage: string;
    response?: any;
}

export interface Cop {
  id: number;
  name: string;
  copID: string;
  gender: string;
  country: string;
  image: string;
}

export interface cityData {
  cityName: string;
  cityTitle: string;
  cityDescription: string;
  cityImage: string;
}

export interface policeData {
  image: string;
  name: string;
  copID: string;
  country: string;
}

export type CustomNode = {
  id: string;
  data: cityData | policeData;
  position: {
    x: number;
    y: number;
  };
  type: string;
  draggable: boolean;
};

export type PoliceNodeType = {
  id: string;
  data: {
    image: string;
    name: string;
    copID: string;
    country: string;
  };
  position: {
    x: number;
    y: number;
  };
  type: string;
  draggable: boolean;
}

export interface ElectricVehicle {
  kind: string;
  range: number;
  count: number;
  image: string;
}

export type Payload = {
  [key: string]: string;
};

export interface CityWithVehicleOptions {
  copId: string;
  copImage: string;
  city: string;
  vehicleOptions: ElectricVehicle[];
}

export interface updateInventoryPayload {
  copId: string;
  vehicleKind: string;
  copVehicleRelations: ElectricVehicle[]
}


export const obtainAllCops = async() => {
    try{
        const res = await authAxios.get(`/getAllCops`);
        return res.data;
    }
    catch(err){
        const error = err as AxiosError;
        return error.response?.data
    }
};

export const saveCopsData = async(copsData: Cop[]) => {
  try{
      const res = await authAxios.post(`/saveSelectedCops`, { selectedCops: copsData });
      return res.data;
  }
  catch(err){
      const error = err as AxiosError;
      return error.response?.data
  }
};

export const getSelectedCops = async() => {
  try{
      const res = await authAxios.get(`/obtainSelectedCops`);
      return res.data;
  }
  catch(err){
      const error = err as AxiosError;
      return error.response?.data
  }
};

export const selectCities = async(data: { copId: string; selectedCity: string }) => {
  try{
      const res = await authAxios.post(`/getSelectedCities`, data);
      return res.data;
  }
  catch(err){
      const error = err as AxiosError;
      return error.response?.data
  }
};

export const getAllVehicles = async() => {
  try{
    const res = await authAxios.get(`/getAllVehicles`);
    return res.data;
  }
  catch(err){
    const error = err as AxiosError;
    return error.response?.data
  }
}

export const getAllEligibleVehiclesList = async(payload: Payload) => {
  try{
    const res = await authAxios.post(`/eligibleVehicles`, payload);
    return res.data;
  }
  catch(err){
    const error = err as AxiosError;
    return error.response?.data
  }
}

export const updatedInventory = async(payload: updateInventoryPayload) => {
  try{
    const res = await authAxios.post(`/getUpdatedInventory`, payload);
    return res.data;
  }
  catch(err){
    const error = err as AxiosError;
    return error.response?.data
  }
}
