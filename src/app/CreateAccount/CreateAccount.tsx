import TopBar from "../TopBar/TopBar";
import SideBar from "../SideBar/SideBar";

function CreateAccount()
{
    return(
        <div>
            <TopBar></TopBar>
            <div className="CreateAccount">
                <SideBar></SideBar>
                <div className="CreateAccountCard">
                    <h2>Create your account</h2>
                    <label>Email</label>
                    <div className="CreateAccountInput">
                        <input type="email"/>
                    </div>
                    <label>Username</label>
                    <input type="text"/>
                    <label>Password</label>
                    <input type="password"></input>
                    <label htmlFor="">Confirm Password</label>
                    <input type='password'></input>
                    <button className="CreateAccountButton">Create</button>
                </div>

            </div>
        </div>
    )
}

export default CreateAccount