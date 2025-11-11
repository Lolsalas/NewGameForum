import TopBar from "../TopBar/TopBar";
import SideBar from "../SideBar/SideBar";

function CreatePost()
{
    return(
    <div>
        <TopBar></TopBar>
        <div className="CreatePost">
            <SideBar></SideBar>
            <div className="CreatePostCard">
                <div className="CreatePostTitle">
                    <h2>Create a Post</h2>
                </div>
            <div className="CreatePostTextBox">
                <form action="">
                    <textarea placeholder="Write your post here!"></textarea>
                    <button>Create Post</button>
                </form>
            </div>

            </div>
        </div>
    </div>
    )
}

export default CreatePost