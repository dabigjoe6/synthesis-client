import * as React from "react";
import { toast } from "react-toastify";
import { Services } from "../config";
import { StatusCallback } from "../types";
import { AuthContext, UserI } from "./Auth";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export interface SubscriptionItemI {
  name: string;
  url: string;
  _id: string;
  source: string;
}

export interface UserContextI {
  subscriptions: { subscription: SubscriptionItemI }[];
  isDataLoading: boolean;
  user: UserI | null;
  setSubscriptions: React.Dispatch<React.SetStateAction<never[]>>;
  unsubscribeFromAuthor: (id: string, cb: StatusCallback) => void;
  subscribeToAuthor: (service: Services, author: string, cb: StatusCallback) => void;
}

export const UserContext = React.createContext<UserContextI>({
  subscriptions: [],
  isDataLoading: true,
  user: null,
  setSubscriptions: () => { },
  unsubscribeFromAuthor: () => { },
  subscribeToAuthor: () => { }
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, signUserOut, token } = React.useContext(AuthContext);

  const [isDataLoading, setDataIsLoading] = React.useState(true);

  const [subscriptions, setSubscriptions] = React.useState([]);

  const _getUserSubscriptions = async () => {
    try {
      const response = await fetch(BASE_URL + "/subscribe/getSubscriptions", {
        method: "POST",
        body: JSON.stringify({ email: user?.email }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 404) throw new Error("Not found", data.message);
        else if (response.status === 401) {
          signUserOut();
          throw new Error("Session expired, please sign in", data.message);
        } else throw new Error(data.message);
      }

      setSubscriptions(data.subscriptions || []);
      setDataIsLoading(false);
    } catch (err) {
      setDataIsLoading(false);
      console.error("Could not get user subscriptions: ", err);
    }
  };

  const unsubscribeFromAuthor = async (id: string, cb: StatusCallback) => {
    try {
      const response = await fetch(BASE_URL + "/subscribe/unsubscribe", {
        method: "POST",
        body: JSON.stringify({ email: user?.email, subscriptionIds: [id] }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 404) throw new Error("Not found", data.message);
        else if (response.status === 401) {
          signUserOut();
          throw new Error("Session expired, please sign in", data.message);
        } else throw new Error(data.message);
      }

      setSubscriptions(data.subscriptions);
      cb(true);
    } catch (err) {
      toast.error(err.message || err);
      cb(false);
      console.error("Could not unsubscribe: ", err);
    }
  };

  const subscribeToAuthor = async (service: Services, author: string, cb: StatusCallback) => {
    try {
      const params = {
        email: user?.email,
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
        else if (response.status === 401) {
          signUserOut();
          throw new Error("Session expired, please sign in", data.message);
        } else throw new Error(data.message);
      }

      setSubscriptions(data.subscriptions);
      cb(true);
    } catch (err) {
      toast.error(err.message || err);
      cb(false);
      console.error("Could not subscribe to service: ", err);
    }
  };

  React.useEffect(() => {
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
