import { createContext, useEffect, useState } from "react";

interface GithubUser {
  avatar_url: string;
  events_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  html_url: string;
  id: number;
  login: string;
  node_id: string;
  organizations_url: string;
  received_events_url: string;
  repos_url: string;
  score: number;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  type: string;
  url: string;
}

interface CurrentUserContext {
  users: GithubUser[];
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
}

const UserContext = createContext<CurrentUserContext>({
  users: [],
  userName: "",
  setUserName: () => {},
  loading: false
});
export default function UserContextProvider({
  children
}: React.PropsWithChildren) {
  const [users, setUsers] = useState<GithubUser[]>([]);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (userName) {
      setLoading(true);
    }
    // we abort fetching if users continues to type while the data is still loading...
    const controller = new AbortController();
    // for slower connections we wait for 1/10th of a second for user to end typing. Thus we make fewer unnecessary requests.
    const timerId = setTimeout(() => {
      if (userName) {
        const signal = controller.signal;
        console.log(
          "%cUserContextProvider.tsx line:54 `${process.env.REACT_APP_BASE_URL}?q=${userName}`",
          "color: #007acc;",
          `${process.env.REACT_APP_BASE_URL}?q=${userName}`
        );
        fetch(`${process.env.REACT_APP_BASE_URL}?q=${userName}`, { signal })
          .then((response) => {
            console.log(
              "%cUserContextProvider.tsx line:61 response",
              "color: #007acc;",
              response
            );
            if (response.ok) {
              return response.json();
            } else {
              return {
                items: [
                  {
                    id: 0,
                    login: `Server responded with status ${response.status}`
                  }
                ]
              };
            }
          })
          .then((data) => {
            setUsers(data.items);
            setLoading(false);
          })
          .catch((error) => {
            if (error.name === "AbortError") {
              console.log(
                "%cUserContextProvider.tsx fetching was aborted, while user types",
                "color: #007acc;",
                error.message
              );
            } else {
              throw error;
            }
          });
      } else {
        setUsers([]);
      }
    }, 100);

    return () => {
      controller.abort();
      clearTimeout(timerId);
    };
  }, [userName]);

  return (
    <UserContext.Provider value={{ users, userName, setUserName, loading }}>
      {children}
    </UserContext.Provider>
  );
}
export { UserContext };
