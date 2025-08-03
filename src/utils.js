import axios from "axios";

const BASE_URL = "https://portfolio-node-w0mg.onrender.com";
// const BASE_URL = "http://localhost:1234";
const makeApiCall = async ({ endPoint = "", method = "GET", data = [] }) => {
  if (!endPoint) return { status: false, message: "Invalid Endpoint" };
  const url = `${BASE_URL}/api${endPoint}`;
  try {
    const response = await axios({
      url,
      method,
      data,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return { status: false, message: "Error in makeApiCall" };
  }
};

const urlFor = (path) => `${BASE_URL}${path}`;

export const Utils = { makeApiCall, urlFor };
