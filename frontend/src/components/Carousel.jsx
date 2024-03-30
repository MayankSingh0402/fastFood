import React, { useState } from "react";
//https://getbootstrap.com/docs/5.0/components/carousel/  ( we use Crossfade and add carousal-caption and add search form)
// https://source.unsplash.com/random/300x300             (we use Specific sizes)
// https://getbootstrap.com/docs/5.0/components/navbar/
export default function Carousel() {
  const [search, setSearch] = useState("");
  return (
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
                  className="btn bg-danger text-white "
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
                style={{ filter: "brightness(80%)", objectFit: "fill" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x700?biryani"
                className="d-block w-100"
                style={{ filter: "brightness(80%)", objectFit: "fill" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x700?barbeque"
                className="d-block w-100"
                style={{ filter: "brightness(80%)", objectFit: "fill" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x700?cake"
                className="d-block w-100"
                style={{ filter: "brightness(80%)", objectFit: "fill" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x700?burger"
                className="d-block w-100"
                style={{ filter: "brightness(80%)", objectFit: "fill" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x700?pizza"
                className="d-block w-100"
                style={{ filter: "brightness(80%)", objectFit: "fill" }}
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
  );
}
