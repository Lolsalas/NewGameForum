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
                    <form action="http://localhost:8081/user" method="POST">
                    <h2>Create your account</h2>
                    <label htmlFor="email">Email</label>
                    <div className="CreateAccountInput">
                        <input type="email" name="Email" id="email"/>
                    </div>
                    <label htmlFor="uname">Username</label>
                    <input type="text" name="Username" id="uname"/>
                    <label htmlFor="pword">Password</label>
                    <input type="password" name="Password" id="pword"></input>
                    {/* <label htmlFor="">Confirm Password</label>
                    <input type='password'></input> */}
                    <button className="CreateAccountButton">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateAccount