import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function Header() {
    const { loggedInUser, setLoggedInUser } = useContext(UserContext);
    const user = { username: "tickle122" };

    const logIn = () => {
        setLoggedInUser(user);
    };

    if (loggedInUser === null) {
        return (
            <header className="header">
                <h1 className="mt2 mb0 baskerville i fw1 f1 w-90">NC News</h1>
                <h2 className="mt2 mb0 f6 fw4 ttu tracked">Lorem ipsum fun</h2>
                <span className="tr dib f5 w-10">
                    Logged in as: {loggedInUser.username}
                </span>
                <button onClick={() => logIn(loggedInUser)}>Login</button>
            </header>
        );
    } else {
        return (
            <header className="header">
                <h1 className="mt2 mb0 baskerville i fw1 f1 w-90">NC News</h1>
                <h2 className="mt2 mb0 f6 fw4 ttu tracked">Lorem ipsum fun</h2>
                <span className="tr dib f5 w-10">
                    Logged in as: {loggedInUser.username}
                </span>
                <button onClick={() => logIn(loggedInUser)}>Login</button>
            </header>
        );
    }
}
