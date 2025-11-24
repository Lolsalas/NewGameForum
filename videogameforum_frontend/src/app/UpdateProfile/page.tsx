import ProfileForm from "./UpdateProfile";
import TopBar from "../TopBar/TopBar";
import SideBar from "../SideBar/SideBar";

import './UpdateProfile.css'

function updateprofile(){
    return(
        <div className="UpdateProfile">
            <TopBar></TopBar>
            <div className="UpdateProfileCard">
                <SideBar></SideBar>
                <div className="UpdateProfileForm">
                    <ProfileForm></ProfileForm>
                </div>
            </div>
        </div>
    )
}

export default updateprofile