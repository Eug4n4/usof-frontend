import { Link } from "react-router-dom";
import ButtonLink from "../components/button/ButtonLink";
import "../assets/css/404.css";

function NoMatch() {
  return (
    <div className="not_found">
      <div className="top">
        <div>
          <h2>404 Page Not Found</h2>
          <p>The page you requested does not exists</p>
        </div>
      </div>
      <div className="bottom">
        <ButtonLink to="/">Go to the home page</ButtonLink>
      </div>
    </div>
  );
}
export default NoMatch;
