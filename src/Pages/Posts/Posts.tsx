import { useEffect, useState } from "react";
import { getComments, getData, getSavedUser } from "../../Utils/UserFunctions";
import Card from "../../Components/Card/Card";
import "./Posts.css";
import { useNavigate } from "react-router-dom";
function Posts() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const Navigate = useNavigate();
  useEffect(() => {
    getData("posts").then((res) => {
      console.log(res);
      setPosts(res);
      console.log(getSavedUser());
    });
  }, []);
      return (
      <div className="postsWrapper">
        {posts.map((post: any) => {
          return (
            <div className="postid" key={post.id}>
              <Card className="Post">
                <div className="Avatar">
                  <img src={getSavedUser().image}></img>
                </div>
                <div className="postColumn">
                  <div className="Info">
                    <div className="FullName">
                      {getSavedUser().firstName} {getSavedUser().lastName}
                    </div>
                    <div className="UserName">
                      <p>@{getSavedUser().username}</p>
                    </div>
                  </div>
                  <div className="Post-Content">{post.body}</div>
                  <div className="Fotter">
                    <div className="Comments">
                      <div
                        className="CommentButton"
                        key={post.id}
                        onClick={()=>Navigate(`/Comment/${post.id}`)} 
                      >
                        Comments
                      </div>
                    </div>
                    <div className="Tags">
                      {post.tags.map((tag: any) => {
                        return <div className="Tag" key={tag} onClick={()=>Navigate((`/Tags/${tag}`))}>#{tag}</div>;
                      })}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
      /*      <div key={post.id}>
    <Card className="Post">
    <div className="Avatar">
      <img src={getSavedUser().image}></img>
    </div>
    <div className="postColumn">
      <div className="Info">
        <div className="FullName">Sami Shelbayeh</div>
        <div className="UserName">@Cocomypops</div>
      </div>
      <div className="Post-Content">
        The paper was blank. It shouldn't have been. There should have
        been writing on the paper, at least a paragraph if not more. The
        fact that the writing wasn't there was frustrating. Actually, it
        was even more than frustrating. It was downright distressing.
      </div>
      <div className="Fotter">
        <div className="Comments">Comments</div>
        <div className="Tags">Tags</div>
      </div>
    </div>
  </Card>
    </div>
    */
    );
  };

export default Posts;
