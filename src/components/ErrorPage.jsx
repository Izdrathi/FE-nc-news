import { Link } from "react-router-dom";

export default function ErrorPage() {
    return (
        <>
            <h3>404 - page not found</h3>
            <Link to="/">Go back</Link>
        </>
    );
}
