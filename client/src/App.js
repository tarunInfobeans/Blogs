import CreatePost from "./CreatePost";
import PostList from "./PostList";
import './app.css'

function App() {
  return (
    <div className="App">
      <h1>Blog Application</h1>
      <CreatePost />
      <hr/>
      <hr/>
      <PostList />
      <hr/>
      <p>&copy; Copyrights Reserved 2020-21 </p>
    </div>
  );
}

export default App;
