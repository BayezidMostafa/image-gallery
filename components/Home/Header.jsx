import Image from "next/image";
import React from "react";
import useSWR from "swr";

// Fetcher function using fetch API
const fetcher = (url) => fetch(url).then((res) => res.json());

const Header = () => {
  const { data, error } = useSWR(
    "https://us-central1-property-listing-platform.cloudfunctions.net/FetchPropertiesApi?city=Mumbai&dashboardTags=Top%20Projects",
    fetcher
  );

  // Placeholder image URL (a small, blurred version of an actual image or a generic placeholder)
  const placeholderImage = "/blug-image.png";  // Update this path with your actual placeholder image path

  // if (error) return <div>Failed to load data</div>;
  // if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Properties in Mumbai</h1>
      <div className="grid grid-cols-3 gap-4">
        {data?.properties?.map((property, index) => (
          <div key={index} className="w-52 h-52 relative">
            <Image
              src={property?.imageUrlList[0]}
              alt={`Image`}
              layout="fill"
              objectFit="cover"
              blurDataURL={placeholderImage}
              placeholder="blur"  // Enables the blur-up effect using the blurDataURL
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Header;
