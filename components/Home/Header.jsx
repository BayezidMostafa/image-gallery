import React from "react";
import useSWR from "swr";
import LazyImage from "../LazyImage/LazyImage";

// Fetcher function using fetch API
const fetcher = (url) => fetch(url).then((res) => res.json());

const Header = () => {
  const { data, error } = useSWR(
    "https://us-central1-property-listing-platform.cloudfunctions.net/FetchPropertiesApi?city=Mumbai&dashboardTags=Top%20Projects",
    fetcher
  );

  const placeholderImage = "/blug-image.png"; // Ensure this is a valid small image for placeholders

  if (error) return <div>Failed to load data</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Properties in Mumbai</h1>
      <div className="grid grid-cols-3 gap-4">
        {data.properties.map((property, index) => (
          <div key={index} className="w-52 h-52 relative">
            <LazyImage
              src={property.imageUrlList[0]}
              alt="Property image"
              placeholder={placeholderImage}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Header;
