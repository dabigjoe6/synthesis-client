import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "./Auth";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const UserContext = createContext({
  subscriptions: [],
  isDataLoading: true,
});

export const UserProvider = ({ children }) => {
  const { user, signUserOut, token } = useContext(AuthContext);

  const [isDataLoading, setDataIsLoading] = useState(true);

  const [subscriptions, setSubscriptions] = useState([]);

  const _getUserSubscriptions = async () => {
    setDataIsLoading(true);
    try {
      const response = await fetch(BASE_URL + "/subscribe/getSubscriptions", {
        method: "POST",
        body: JSON.stringify({ email: user.email }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const _subscriptions = (await response.json())?.subscriptions || [];
      setSubscriptions(_subscriptions);
      setDataIsLoading(false);

    } catch (err) {
      setDataIsLoading(false);
      console.error("Could not get user subscriptions: ", err);
    }
  };

  const unsubscribeFromAuthor = async (id, cb) => {
    try {
      const response = await fetch(BASE_URL + "/subscribe/unsubscribe", {
        method: "POST",
        body: JSON.stringify({ email: user.email, subscriptionIds: [id] }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response && response.status === 200) {
        setSubscriptions(data.subscriptions);
        cb(true);
      } else if (response && response.status === 403) {
        toast.error("Session expired, please sign in");
        signUserOut();
        cb(false);
      }
    } catch (err) {
      console.error("Could not unsubscribe: ", err);
    }
  };

  const subscribeToAuthor = async (service, author, cb) => {
    try {
      const params = {
        email: user.email,
        author,
      };

      let response = await fetch(BASE_URL + "/subscribe/" + service, {
        method: "POST",
        body: JSON.stringify(params),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      response = await response.json();

      if (response && response.status === 200) {
        setSubscriptions(response.subscriptions);
        cb(true);
      } else if (response && response.status === 403) {
        toast.error("Session expired, please sign in");
        signUserOut();
        cb(false);
      }
    } catch (err) {
      cb(false);
      console.error("Could not subscribe to service: ", err);
    }
  };

  useEffect(() => {
    if (user) {
      _getUserSubscriptions()
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        subscriptions,
        setSubscriptions,
        unsubscribeFromAuthor,
        subscribeToAuthor,
        isDataLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
