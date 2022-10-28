import { useContext } from "react";
import { SERVICES } from "../config";
import { AuthContext } from "../contexts/Auth";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const useSubscription = () => {
  const { email } = useContext(AuthContext);
  const subscribeToMedium = async (params) => {
    await fetch(BASE_URL + "/subscribe/medium", {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const subscribeToService = async (service, params) => {
    try {
      switch (service) {
        case SERVICES.MEDIUM:
          await subscribeToMedium(params);
          break;
        default:
          await subscribeToMedium(params);
          break;
      }
    } catch (err) {
      throw err;
    }
  };

  const getUserSubscriptions = async () => {
    try {
      const response = await fetch(BASE_URL + "/subscribe/getSubscriptions", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      return (await response.json())?.subscriptions;
    } catch (err) {
      throw err;
    }
  };

  return {
    subscribeToService,
    getUserSubscriptions,
  };
};

export default useSubscription;
