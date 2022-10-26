import { SERVICES } from "../config";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const useSubscription = () => {
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

  return {
    subscribeToService,
  };
};

export default useSubscription;
