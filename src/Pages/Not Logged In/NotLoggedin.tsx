import { useNavigate } from "react-router-dom";
import Card from "../../Components/Card/Card";
import Button from "../../Styled Components/Buttons";
import "./NotLoggedin.css";
function NotLoggedIn() {
    const Navigate = useNavigate();
    return <Card>
        <div className="Container5">
            <p>Not Logged In</p>
            <Button className="LoginButton2"onClick={()=>Navigate("/Users")}>Login</Button>
            </div>
        </Card>;
}

export default NotLoggedIn;