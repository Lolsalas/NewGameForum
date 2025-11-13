import { BrowserRouter } from "react-router-dom";
import CreateForum from "./CreateForum";
import './CreateForum.css'

function createforum()
{
    return(
        <BrowserRouter>
        <CreateForum></CreateForum>
        </BrowserRouter>
    )

}

export default createforum