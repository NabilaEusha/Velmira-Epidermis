import StarRatings from "react-star-ratings";


const Product = ({img, title}) => {
  return (
     <div className="flex flex-col items-center justify-center h-[500px] m-[30px] cursor-pointer">
        <img
          src={img}
          alt=""
          className="h-[400px] w-[300px] bg-cover"
        ></img>
        <h2 className="font-semibold text-[18px] w-[300px]">
          {title}       
        </h2>
        <span className="text-[18px] font-semibold flex items-center justify-center">
          $100
        </span>
        <span className="flex items-center">
          <StarRatings
            rating={2.403}
            starDimension="25px"
            starRatedColor="yellow"
            starSpacing="5px"
          />
          (2)
        </span>
      </div>
  )
}

export default Product
