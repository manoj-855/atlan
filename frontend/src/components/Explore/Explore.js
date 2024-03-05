import { React, useRef, useState, useContext } from "react";
import ExploreModels from "./contents/ExploreModels";
import "./ModelCard.css";
import "animate.css";
import AiModelCard from "./contents/AiModelCard";
import { useNavigate } from "react-router-dom";
import GitHubDataContext from "./../context/Datacontext";
import Loading from "./../../utils/Loading";
import { useEffect } from "react";
import Error from "./../../utils/Error";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchengin } from "@fortawesome/free-brands-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Pagination from "../Pagination";


const Explore = () => {
  const scrollViewRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStartX, setScrollStartX] = useState(0);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [needRerender, setNeedRerender] = useState(false);
  const [sortCriteria, setSortCriteria] = useState("category");

  const { data, isLoading, error } = useContext(GitHubDataContext);

  const [currentPage,setCurrentPage]=useState(1);
  const [postsPerPage,setPostsPerPage]=useState(10);


  const lastPostIndex=currentPage*postsPerPage;
  const firstPostIndex=lastPostIndex-postsPerPage;

  console.log(data);
  useEffect(() => {
    if (needRerender) {
      setNeedRerender(false);
    }
  }, [needRerender]);

  if (!data) {
    return <Loading />;
  }

  const onDragStart = (e) => {
    setIsDragging(true);
    setStartX(e.pageX);
    setScrollStartX(scrollViewRef.current.scrollLeft);
  };

  const onDragEnd = () => {
    setIsDragging(false);
  };

  const onDragMove = (e) => {
    if (!isDragging) return;
    const currentX = e.pageX;
    const walk = currentX - startX;
    scrollViewRef.current.scrollLeft = scrollStartX - walk;
  };

  const scrollLeft = () => {
    scrollViewRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollViewRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };
  const navigateToPage = () => {
    navigate("/create-model");
  };

  const filteredAndSortedData = data
    .filter(
      (model) =>
        model.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortCriteria === "name") {
        return a.title.localeCompare(b.title);
      } else if (sortCriteria === "category") {
        return a.category.localeCompare(b.category);
      } else {
        return a.popularity.localeCompare(b.popularity);
      }
    });

  if (isLoading) return <Loading />;
  if (error)
    return <Error message={"Error while fetching data, Please try again."} />;

    const currentPosts=filteredAndSortedData.slice(firstPostIndex,lastPostIndex);

  return (
    <>
      <Helmet>
        <title>Explore</title>
        <meta name="description" content="Explore Page " />
      </Helmet>
      <div className="explore_top">
        <h2 className="tag-text">Most Loved</h2>
        <div
          className="scroll-view-container"
          onMouseDown={onDragStart}
          onMouseUp={onDragEnd}
          onMouseLeave={onDragEnd}
          onMouseMove={onDragMove}
        >
          <button  style={{ marginRight: "10px" ,left:"0"}} onClick={scrollLeft}>
            &lt;
          </button>
          <div className="scroll-view" ref={scrollViewRef}>
            {data &&
              data
                .filter((model) => model.popularity === "10")
                .map((model) => <ExploreModels key={model.id} model={model} />)}
          </div>
          <button
            style={{ marginRight: "35px", right: "0" }}
            onClick={scrollRight}
          >
            &gt;
          </button>
        </div>
      </div>

      <div className="all_top" style={{ width: "100%" }}>
        <div className="top_1">
          <h4
            style={{ textAlign: "center", color: "white", marginTop: "20px" }}
          >
            All Models
          </h4>

          <div className="search_top">
            <input
              type="text"
              placeholder="Search Name/Category"
              className="search-bar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search-btn">
              <FontAwesomeIcon icon={faSearchengin} />
            </button>
          </div>
          <div className="sort-by-dropdown">
            <label
              style={{ color: "white", marginRight: "10px"}}
              htmlFor="sortby"
            >
              Sort by:
            </label>
            <select
              id="sortby"
              name="sortby"
              style={{width:"140px"}}
              onChange={(e) => setSortCriteria(e.target.value)}
            >
              <option value="category">Category</option>
              <option value="name">Name</option>
              <option value="category">Provider</option>
            </select>
          </div>
        </div>
        <div className="AI-model-container">
          <div className="model-list">
            {data &&
              currentPosts.map((model) => (
                <AiModelCard key={model.id} model={model} />
              ))}
              <Pagination postsPerPage={postsPerPage} totalPosts={filteredAndSortedData.length} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
          </div>
          
        </div>
      </div>

      <button className="fab" onClick={navigateToPage}>
        +
      </button>
    </>
  );
};

export default Explore;
