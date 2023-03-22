import { NavLink } from "react-router-dom";

const Bloglist = (props) => {  
    const {blogs,title} = props;

    return ( 
        <div className="bloglist">
            <h2>{title}</h2>
            {
                blogs.map((blog)=>(
                    <div className="blog" key={blog.id}>
                        <NavLink to={"/blogs/"+blog.id} className="blog-title">{blog.title}</NavLink>
                        <small className="blog-description-date">Publié le : {blog.date}</small>
                        <p className="blog-author">Publié par : {blog.author}</p>
                    </div>
                ))
            }
        </div>
     );
}
 
export default Bloglist;