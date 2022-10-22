import axios from "axios"

export const fetchServices=async()=>{
    const {data}=await axios.get("http://localhost:5049/api/ServiceInformations");
    return data;
};