import { useEffect, useState } from "react";
import * as api from "../../utils/api.js";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext.js";

export default function Nav() {
    const [topics, setTopic] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { loggedInUser, setLoggedInUser } = useContext(UserContext);
    const user = { username: "tickle122" };

    const logIn = () => {
        setLoggedInUser(user);
    };

    useEffect(() => {
        api.getTopics().then((topics) => {
            setTopic(topics);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) return <p>loading..</p>;

    return (
        <nav
            className="navbar is-dark"
            role="navigation"
            aria-label="main navigation"
        >
            <div className="navbar-start">
                <ul className="navbar-item mx-5">
                    <li className="navbar-item mx-5">
                        <Link className="has-text-light" to={`/`}>
                            Home
                        </Link>
                    </li>
                    {topics.map(({ slug }) => {
                        return (
                            <li className="navbar-item mx-5" key={slug}>
                                <Link
                                    className="has-text-light"
                                    to={`/articles/${slug}`}
                                >
                                    {slug}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
            {loggedInUser === "" ? (
                <div className="navbar-end">
                    <button
                        className="button is-danger is-outlined is-medium is-responsive mx-5"
                        onClick={() => logIn(loggedInUser)}
                    >
                        Login
                    </button>
                </div>
            ) : (
                <div className="navbar-end mx-5">
                    <span>Logged in as: {loggedInUser.username}</span>
                </div>
            )}
        </nav>
    );
}
