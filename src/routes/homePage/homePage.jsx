import { useContext } from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";
import { AuthContext } from "../../context/AuthContext";

function HomePage() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">
            Discover Properties & Secure Your Ideal Home
          </h1>
          <p>
            Welcome to GorkhaHomes, your ultimate destination for finding the
            perfect property in Nepal. Our user-friendly platform offers a vast
            selection of homes, from cozy apartments to luxurious estates. With
            advanced search features and personalized recommendations, we make
            your home-buying journey seamless and enjoyable. Start your dream
            home search today with GorkhaHomes.
          </p>
          <SearchBar />
          <div className="boxes">
            <div className="box">
              <h1>16+</h1>
              <h2>Years of Experience</h2>
            </div>
            <div className="box">
              <h1>200</h1>
              <h2>Award Gained</h2>
            </div>
            <div className="box">
              <h1>2000+</h1>
              <h2>Property Ready</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img
          src="https://i.ytimg.com/vi/qpXWepTBU90/maxresdefault.jpg"
          alt=""
        />
      </div>
    </div>
  );
}

export default HomePage;

// /bg.png
