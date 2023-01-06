import { useContext, useCallback } from "react";
import { AuthContext } from "../contexts/Auth";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const useSubscription = () => {
  const { email } = useContext(AuthContext);

  const subscribeToService = useCallback(async (service, params) => {
    try {
      const response = await fetch(BASE_URL + "/subscribe/" + service, {
        method: "POST",
        body: JSON.stringify(params),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      return data.subscriptions;
    } catch (err) {
      console.error("Could not subscribe to service: ", err);
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
      console.error("Could not get user subscriptions: ", err);
    }
  }, [email]);

  const unsubscribe = useCallback(
    async (id) => {
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
        console.error("Could not unsubscribe: ", err);
      }
    },
    [email]
  );

  return {
    subscribeToService,
    getUserSubscriptions,
    unsubscribe,
  };
};

export default useSubscription;
