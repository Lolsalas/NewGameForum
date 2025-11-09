import SideBar from "./SideBar/SideBar";
import TopBar from "./TopBar/TopBar";
import MainMenu from "./MainMenu/MainMenu";
import '../app/app.css'

function  App()
{
    return(
        <div>
            <TopBar></TopBar>
        <div className="Layout">
            <SideBar></SideBar>
            <div className="RightArea">
                <div className="MainContent">
                <MainMenu></MainMenu>
                </div>
            </div>
        </div>
        </div>
    )
}
export default App