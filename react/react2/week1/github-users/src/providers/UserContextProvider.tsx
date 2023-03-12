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

const UserContext = createContext<GithubUser[]>([]);
export default function UserContextProvider({
  children
}: React.PropsWithChildren) {
  const [users, setUsers] = useState<GithubUser[]>([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}?q=${"benna"}`)
      .then((response) => {
        console.log(
          "%cUserContextProvider.tsx line:11 response",
          "color: #007acc;",
          response
        );
        return response.json();
      })
      .then((data) => setUsers(data.items));
  }, []);
  return <UserContext.Provider value={users}>{children}</UserContext.Provider>;
}
export { UserContext };
