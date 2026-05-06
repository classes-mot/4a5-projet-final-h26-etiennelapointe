import "../../Main.css";

const StarRating = ({ rating }) => {
  // Create an array based on the rating integer
  const stars = Array(Math.floor(rating)).fill(0);

  return (
    <div className="star-rating">
      {stars.map((_, index) => (
        <span key={index} className="star-filled">
          ★
        </span>
      ))}
    </div>
  );
};
// Usage: <StarRating rating={3} /> (renders 3 stars)
export default StarRating;
