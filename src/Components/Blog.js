//Blogging App using Hooks
import { useState, useRef, useEffect } from "react";
import { collection, addDoc, onSnapshot,deleteDoc,doc} from "firebase/firestore";

import { db } from '../firebaseint';
export default function Blog() {


    const [formData, setFormData] = useState({ title: "", content: "" })
    const [blog, setblogs] = useState([]);
    const titleref = useRef(null)


    //to make focus on title when we component mount 
    useEffect(() => {
        titleref.current.focus();
    }, [])

    //setting the lastest totle of blog array as title of our app
    useEffect(() => {
        if (blog.length && blog[0].title) {
            document.title = blog[0].title
        }
        else {
            document.title = "No blog persent"
        }
    }, [blog])


    //fetching data from firebase
    useEffect(() => {
        // async function fetchData() {

        //     const querySnapshot = await getDocs(collection(db, "Blog"));
        //     const fetchedBlog = querySnapshot.docs.map((doc)=>{
        //         return{
        //             id:doc.id,
        //             ...doc.data()
        //         }
        //     })
        //     setblogs(fetchedBlog)
        // }
        // fetchData();


        onSnapshot(collection(db, "Blog"), (querySnapshot) => {
            const fetchblog = querySnapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            })
            setblogs(fetchblog)
            
        });


    }, [])




    //Passing the synthetic event as argument to stop refreshing the page on submit
    async function handleSubmit(e) {
        e.preventDefault();

        // setblogs([formData, ...blog])


        //adding data to firebase
     await addDoc(collection(db, "Blog"), {
            title: formData.title,
            content: formData.content,
            createdOn: new Date()
        });


        setFormData({ title: "", content: "" });
        titleref.current.focus();
    }

    async function handledelete(id) {
        // console.log('blog deleted ', index)
        // const deleteblog = [...blog]
        // deleteblog.splice(index, 1)
        // setblogs(deleteblog);

        await deleteDoc(doc(db, "Blog", id));


    }

    return (
        <>
            <h1>Write a Blog!</h1>

            <div className="section">

                <form onSubmit={handleSubmit}>


                    <Row label="Title">
                        <input className="input"
                            placeholder="Enter the Title of the Blog here.."
                            value={formData.title}
                            onChange={(e) => {
                                setFormData({ title: e.target.value, content: formData.content })
                            }}
                            ref={titleref}
                            required
                        />
                    </Row >

                    <Row label="Content">
                        <textarea className="input content"
                            placeholder="Content of the Blog goes here.."
                            value={formData.content}
                            onChange={(e) => {
                                setFormData({ title: formData.title, content: e.target.value });
                            }}
                            required />
                    </Row >


                    <button className="btn">ADD</button>
                </form>

            </div>

            <hr />


            <h2> Blogs </h2>

            {blog.map((item, index) => (
                <div className="blog" key={index}>
                    <h3>{item.title}</h3>
                    <p>{item.content}</p>
                    <button onClick={() => {
                        handledelete(item.id)} }
                        className="btn remove" >delete</button>
                </div>
            ))}

        </>
    )
}

//Row component to introduce a new row section in the form
function Row(props) {
    const { label } = props;
    return (
        <>
            <label>{label}<br /></label>
            {props.children}
            <hr />
        </>
    )
}
