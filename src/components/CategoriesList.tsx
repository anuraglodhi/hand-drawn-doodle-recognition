import categories from "../assets/categories.ts";

const CategoriesList = () => {
  const categoryList = categories.split(" ");

  return (
    <div className="category-list flex flex-wrap justify-center">
      {categoryList.map((category: string, key: number) => (
        <div
          key={key}
          className="p-2 m-2 flex justify-center font-mono capitalize shadow-xl w-[160px] aspect-square text-center items-center font-semibold text-lg"
        >
          <p>{category.split(/[_-]+/).join(" ")}</p>
        </div>
      ))}
    </div>
  );
};

export default CategoriesList;
