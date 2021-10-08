import axios from "axios";

const getLotData = async (gnafId) => {
  const options = {
    method: "GET",
    url: "/api/gnaf",
    baseURL: "http://localhost:3000",
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      gnafId: gnafId,
    },
    validateStatus: (status) => {
      return status >= 200 && status < 300;
    },
  };

  const res = await axios(options);
  const data = await res.data;

  console.log("lot info: ", data[0]["lot_profile"]);

  return data[0]["lot_profile"];
};

export { getLotData };
