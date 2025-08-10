import axios from "axios";
import qs from "qs";
import esriId from "@arcgis/core/identity/IdentityManager";
import esriConfig from "@arcgis/core/config";
import Cookies from "js-cookie";

esriConfig.portalUrl = import.meta.env.VITE_PORTAL_URL;

export const getAndRegisterEsriToken = async () => {
  if (
    !import.meta.env.VITE_PORTAL_USERNAME ||
    !import.meta.env.VITE_PORTAL_PASSWORD
  ) {
    console.error("Missing environment variables for username or password");
    throw new Error("Configuration error: missing credentials");
  }
  if (!import.meta.env.VITE_PORTAL_URL_SERVER) {
    console.error("Missing environment variable for VITE_PORTAL_URL_SERVER");
    throw new Error("Configuration error: missing server URL");
  }

  const payload = {
    username: import.meta.env.VITE_PORTAL_USERNAME,
    password: import.meta.env.VITE_PORTAL_PASSWORD,
    client: "referer",
    referer: window.location.origin,
    expiration: 720,
    f: "json",
  };

  const tokenUrl = `${import.meta.env.VITE_PORTAL_URL_SERVER}`;

  try {
    const response = await axios.post(tokenUrl, qs.stringify(payload), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      timeout: 10000,
    });

    if (!response.data || !response.data.token) {
      console.error(
        "Invalid response received from ArcGIS token service",
        response.data
      );
      throw new Error("Failed to retrieve token");
    }

    const tokenInfo = {
      expires: response.data.expires,
      server: import.meta.env.VITE_PORTAL_URL_SERVER,
      token: response.data.token,
      userId: payload.username,
    };

    AddTokenToThePortal(response.data.token);

    esriId.registerToken(tokenInfo);

    return tokenInfo;
  } catch (error:any) {
    console.error("Error fetching ArcGIS token:", error.message || error);
    return null;
  }
};

async function AddTokenToThePortal(token:any) {
  Cookies.set("esri_aopc", token, {
    expires: 7,
    path: "/",
    secure: true,
    sameSite: "Lax",
  });

  Cookies.set("esri_locale", "en", {
    expires: 7,
    path: "/",
    secure: true,
    sameSite: "None",
  });

  const currentDate = new Date();
  function addOneMonth(date:any) {
    date.setMonth(date.getMonth() + 1);
    return date;
  }
  const esriJSAPIOAuthValue = {
    "/": {
      "https://adcgis.adc.jo/portal": {
        appId: "dashboards",
        codeVerifier: null,
        expires: addOneMonth(currentDate).getTime(),
        refreshToken: null,
        ssl: true,
        stateUID: null,
        token: token,
        userId: "portaladmin",
      },
    },
  };
  sessionStorage.setItem("esriJSAPIOAuth", JSON.stringify(esriJSAPIOAuthValue));
}
