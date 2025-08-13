import axios from "axios";
import qs from "qs";
import esriId from "@arcgis/core/identity/IdentityManager";
import esriConfig from "@arcgis/core/config";

esriConfig.portalUrl = import.meta.env.VITE_PORTAL_URL;

export const getAndRegisterEsriToken = async () => {
    const payload = {
        username: "portaladmin",
        password: "PortalAdmin123",
        client: "referer",
        referer: window.location.origin,
        expiration: 720,
        f: "json",
    };

    const tokenUrl = `${import.meta.env.VITE_PORTAL_URL_SERVER}/generateToken`;

    try {
        const response = await axios.post(tokenUrl, qs.stringify(payload), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
            timeout: 10000, 
        });

        if (!response.data || !response.data.token) {
            console.error("Invalid response received from ArcGIS token service", response.data);
            throw new Error("Failed to retrieve token");
        }

        const tokenInfo = {
            expires: response.data.expires,
            server: import.meta.env.VITE_PORTAL_URL_SERVER,
            token: response.data.token,
            userId: payload.username,
        };

        esriId.registerToken(tokenInfo);
        esriConfig.portalUrl = import.meta.env.VITE_PORTAL_URL_SERVER;

        return tokenInfo;
    } catch (error:any) {
        console.error("Error fetching ArcGIS token:", error.message || error);
        return null;
    }
};