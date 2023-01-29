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

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 404) throw new Error("Not found", data.message);
        else if (response.status === 401)
          throw new Error("Unauthorized", data.message);
        else throw new Error(data.message);
      }

      setSubscriptions(data.subscriptions || []);
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

      if (!response.ok) {
        if (response.status === 404) throw new Error("Not found", data.message);
        else if (response.status === 401)
          throw new Error("Unauthorized", data.message);
        else throw new Error(data.message);
      }

      setSubscriptions(data.subscriptions);
      cb(true);
    } catch (err) {
      toast.error(err.message || err);
      signUserOut();
      cb(false);
      console.error("Could not unsubscribe: ", err);
    }
  };

  const subscribeToAuthor = async (service, author, cb) => {
    try {
      const params = {
        email: user.email,
        author,
      };

      const response = await fetch(BASE_URL + "/subscribe/" + service, {
        method: "POST",
        body: JSON.stringify(params),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 404) throw new Error("Not found", data.message);
        else if (response.status === 401)
          throw new Error("Unauthorized", data.message);
        else throw new Error(data.message);
      }

      setSubscriptions(data.subscriptions);
      cb(true);
    } catch (err) {
      toast.error(err.message || err);
      signUserOut();
      cb(false);
      console.error("Could not subscribe to service: ", err);
    }
  };

  useEffect(() => {
    if (user) {
      _getUserSubscriptions();
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
