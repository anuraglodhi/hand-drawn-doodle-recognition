import categories from "../assets/categories.ts";

const CategoriesList = () => {
  const categoryList = categories.split(" ");

  return (
    <div className="category-list flex flex-wrap justify-center">
      {categoryList.map((category: string, key: number) => (
        <div
          key={key}
          className="p-2 m-2 flex flex-col justify-center font-mono capitalize shadow-xl sm:w-[180px] w-[120px] aspect-square text-center items-center font-semibold sm:text-lg text-sm"
        >
          <img
            src={`../../examples/${category}.png`}
            width={100}
            height={100}
            className="m-2"
          />
          <p>{category.split(/[_-]+/).join(" ")}</p>
        </div>
      ))}
    </div>
  );
};

export default CategoriesList;
