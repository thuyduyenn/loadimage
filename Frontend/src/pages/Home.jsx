import {BsSearch} from "react-icons/bs"
import Gallery from "../components/Gallery";

const Home = () => {
  

    return ( 
      <div>
      <div className="home">

            <img src="https://images.unsplash.com/photo-1654157925394-4b7809721149?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1460&q=80" alt="search-img"/>
          <div className="content">
            <h1>Image Gallery with JavaScript</h1>
            <p>Search and download any images within a second</p>
            <div className="search-box">
                <i className='bx bx-search-alt-2'><BsSearch/></i>
                <input type="text" placeholder="Search images"/>  
            </div>
          </div>
      </div>
      <Gallery/>
    
     
      </div>
 );
}
 
export default Home;