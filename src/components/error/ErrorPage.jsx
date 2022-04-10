import { Link } from "react-router-dom";

export default function ErrorPage() {
    return (
        <main>
            <h3>404 - Page not found</h3>
            <Link to="/">Go back</Link>
        </main>
    );
}
