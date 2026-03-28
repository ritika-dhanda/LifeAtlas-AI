function SkeletonCard() {

  return (

    <div className="bg-white p-6 rounded-xl shadow mb-4 animate-pulse">

      <div className="h-4 bg-gray-300 rounded w-1/3 mb-3"></div>

      <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>

      <div className="h-3 bg-gray-300 rounded w-5/6"></div>

    </div>

  );

}

export default SkeletonCard;