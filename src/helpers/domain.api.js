import axios from "axios";

const queryDomainAPI = async (method, endpoint, body) => {
  const reqMethod = method.toLowerCase();

  if (!reqMethod == "get" || !reqMethod == "post") {
    throw new Error("Request method has to be GET or POST");
  }

  const options = {
    method: reqMethod,
    url: endpoint,
    baseURL: "https://api.domain.com.au",
    headers: {
      "X-API-Key": "key_2f983e370854fbc8917aeffb532aa18a",
      "Content-Type": "application/json",
    },
    validateStatus: (status) => {
      return status >= 200 && status < 300;
    },
  };

  if (reqMethod == "post") {
    if (typeof body === "object" && Object.keys(body).length > 0) {
      options.data = body;
    } else {
      throw new Error("Request body should be non-empty.");
    }
  }

  if (
    reqMethod == "get" &&
    typeof body === "object" &&
    Object.keys(body).length > 0
  ) {
    options.params = body;
  }

  try {
    const res = await axios(options);
    const data = await res.data;
    // if (res.status === 200) {
    //     // console.log(res.status);
    //     return res.data;
    // }

    return data;
  } catch (err) {
    // console.error(error);
    console.log(
      "Error code: " + err.response.status + " - " + err.response.data.message
    );
  }
};

const getPropertyData = async (propertyId) => {
  const endpoint = "/v1/properties/" + propertyId;
  const res = await queryDomainAPI("get", endpoint);
  return res;
};

const getPropertyAddress = async (searchText, size) => {
  console.log("Search text: ", searchText);
  const endpoint = "/v1/properties/_suggest";
  const params = {
    terms: searchText,
    pageSize: size,
    channel: "Residential",
  };
  const res = await queryDomainAPI("get", endpoint, params);
  return res;
};

export {
  queryDomainAPI,
  getPropertyData,
  getPropertyAddress,
};