import { useEffect, useState } from "react";
import * as api from "../api";
import { Link } from "react-router-dom";

export default function Nav() {
  const [topics, setTopic] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.getTopics().then((topics) => {
      setTopic(topics);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <p>loading..</p>;
  return (
    <nav className="bt bb tc mw-100 center mt4">
      <ul className="dib">
        <li className="f6 f5-l bg-animate black-80 hover-bg-light-blue dib pa3 ph4-l">
          <Link className="no-underline" to={`/`}>
            home
          </Link>
        </li>
        {topics.map(({ slug }) => {
          return (
            <li
              key={slug}
              className="f6 f5-l bg-animate black-80 hover-bg-light-blue dib pa3 ph4-l"
            >
              <Link className="no-underline" to={`/articles/${slug}`}>
                {slug}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
