import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
// import Carousel from "../components/Carousel";
import Card from "../components/Card";
import { Backendurl } from "../services/helper";
export default function Home() {
  // we can't use .map function on objects, isili hm backend se data as a form of array hi la rhe h
  const [foodCategory, setFoodCategory] = useState([]);
  const [food_items, setFood_items] = useState([]);
  const [search, setSearch] = useState("");

  // load data from backend and set it to food_items and foodCategory
  const loadData = async () => {
    let responce = await fetch(`${Backendurl}/api/auth/foodData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    responce = await responce.json();
    setFood_items(responce[0]);
    setFoodCategory(responce[1]);
    //console.log(responce[0], responce[1]); // responce[0] is food_items and responce[1] is foodCategory
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar></Navbar>
      </div>

      {/* here we can paste the crousel because we have to add the search functionality and it use only once in home page  */}
      {/* <Carousel></Carousel> */}
      <div>
        <div>
          <div
            id="carouselExampleFade"
            className="carousel slide carousel-fade"
            data-bs-ride="carousel"
            style={{ objectFit: "contain !important" }}
          >
            <div className="carousel-inner" id="carousel">
              <div className="carousel-caption" style={{ zIndex: "10" }}>
                <div className="d-flex justify-content-center">
                  {" "}
                  <input
                    className="form-control me-2 w-75"
                    type="search"
                    style={{ backgroundColor: "#EEF5FF", color: "#161A1F" }}
                    placeholder="Search in here..."
                    aria-label="Search"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                  <button
                    className="btn  text-white searchButton "
                    style={{
                      padding: "8px 16px",
                      border: "none",
                      borderRadius: "5px",
                      backgroundColor: "#FB641B",
                    }}
                    onClick={() => {
                      setSearch("");
                    }}
                  >
                    Search
                  </button>
                </div>
              </div>

              <div className="carousel-item active">
                <img
                  src="https://source.unsplash.com/random/900x700?food"
                  className="d-block w-100"
                  style={{ filter: "brightness(90%)", objectFit: "cover" }}
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://source.unsplash.com/random/900x700?biryani"
                  className="d-block w-100"
                  style={{ filter: "brightness(90%)", objectFit: "cover" }}
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://source.unsplash.com/random/900x700?barbeque"
                  className="d-block w-100"
                  style={{ filter: "brightness(90%)", objectFit: "cover" }}
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://source.unsplash.com/random/900x700?cake"
                  className="d-block w-100"
                  style={{ filter: "brightness(90%)", objectFit: "cover" }}
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://source.unsplash.com/random/900x700?burger"
                  className="d-block w-100"
                  style={{ filter: "brightness(90%)", objectFit: "cover" }}
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://source.unsplash.com/random/900x700?pizza"
                  className="d-block w-100"
                  style={{ filter: "brightness(90%)", objectFit: "cover" }}
                  alt="..."
                />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleFade"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleFade"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>

      {/* Card Display for all the food category */}
      <div className="container">
        {foodCategory &&
        Array.isArray(foodCategory) &&
        foodCategory.length > 0 ? (
          foodCategory.map((data) => {
            return (
              <div className="row">
                {/* here we change data._id to data.id and below change filteredItem._id to filteredItem.id */}

                {/* Name of the Food Category */}
                <div
                  key={data.id}
                  className="fs-3 m-3"
                  style={{ color: "#161A1F" }}
                >
                  {data.CategoryName}
                </div>

                <hr
                  id="hr-success"
                  style={{
                    height: "4px",
                    backgroundImage:
                      "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))",
                  }}
                ></hr>

                {food_items &&
                Array.isArray(food_items) &&
                food_items.length > 0 ? (
                  food_items
                    .filter(
                      (item) =>
                        item.CategoryName === data.CategoryName &&
                        item.name.toLowerCase().includes(search.toLowerCase()) // when we write any thing in search bar then it filter the data according to that ( it matches with food_item.name  )
                    )
                    .map((filteredItem) => {
                      return (
                        <div
                          key={filteredItem.id}
                          className="col-12 col-md-6 col-lg-3"
                        >
                          <Card
                            foodName={filteredItem.name}
                            item={filteredItem}
                            options={filteredItem.options[0]}
                            ImgSrc={filteredItem.img}
                          ></Card>
                        </div>
                      );
                    })
                ) : (
                  <div>loading...</div>
                )}
              </div>
            );
          })
        ) : (
          <div>loading...</div>
        )}
      </div>
      <div>
        <Footer></Footer>
      </div>

      {/*  Add css Property to the current  File  */}

      <style>
        {`
         .searchButton{
          transition:color 0.3s ease-in-out;
          background-color:#FB641B;
         }
         .searchButton:hover{
          background-color:#FB641B;
         }
        `}
      </style>
    </div>
  );
}
