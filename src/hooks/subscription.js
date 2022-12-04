import { useContext, useCallback } from "react";
import { SERVICES } from "../config";
import { AuthContext } from "../contexts/Auth";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const useSubscription = () => {
  const { email } = useContext(AuthContext);
  const subscribeToMedium = async (params) => {
    const response = await fetch(BASE_URL + "/subscribe/medium", {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data.subscriptions;
  };

  const subscribeToService = useCallback(async (service, params) => {
    try {
      switch (service) {
        case SERVICES.MEDIUM:
          return subscribeToMedium(params);
        default:
          return subscribeToMedium(params);
      }
    } catch (err) {
      throw err;
    }
  }, []);

  const getUserSubscriptions = useCallback(async () => {
    try {
      const response = await fetch(BASE_URL + "/subscribe/getSubscriptions", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      return (await response.json())?.subscriptions || [];
    } catch (err) {
      throw err;
    }
  }, [email]);

  const unsubscribe = useCallback(async (id) => {
    try {
      const response = await fetch(BASE_URL + "/subscribe/unsubscribe", {
        method: "POST",
        body: JSON.stringify({ email, subscriptionIds: [id] }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      return data.subscriptions;
    } catch (err) {
      throw err;
    }
  }, [email]);

  return {
    subscribeToService,
    getUserSubscriptions,
    unsubscribe,
  };
};

export default useSubscription;
