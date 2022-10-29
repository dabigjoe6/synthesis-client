import { createContext, useContext, useEffect, useState } from "react";
import useSubscription from "../hooks/subscription";
import { AuthContext } from "./Auth";

export const UserContext = createContext({
  subscriptions: [],
  isDataLoading: true,
});

export const UserProvider = ({ children }) => {
  const { email } = useContext(AuthContext);
  const { getUserSubscriptions, unsubscribe, subscribeToService } =
    useSubscription();

  const [isDataLoading, setDataIsLoading] = useState(true);

  const [subscriptions, setSubscriptions] = useState([]);

  const _getUserSubscriptions = async () => {
    setDataIsLoading(true);
    const _subscriptions = await getUserSubscriptions();
    console.log("_subscriptions", _subscriptions);
    setSubscriptions(_subscriptions);
    setDataIsLoading(false);
  };

  const unsubscribeFromAuthor = async (id) => {
    const _newSubscriptions = await unsubscribe(id);
    setSubscriptions(_newSubscriptions);
  };

  const subscribeToAuthor = async (service, author) => {
    const _newSubscriptions = await subscribeToService(service, {
      email,
      author,
    });
    console.log("_newSubscriptions", _newSubscriptions)
    setSubscriptions(_newSubscriptions);
  };

  useEffect(() => {
    _getUserSubscriptions();
  }, [email]);

  return (
    <UserContext.Provider
      value={{
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
