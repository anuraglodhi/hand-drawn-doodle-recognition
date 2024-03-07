import categories from '../assets/categories.ts'

const CategoriesList = () => {
  const categoryList = categories.split(' ')

  return (
    <table className='category-list m-2'>
      <thead>
        <tr>
          <th className='pb-4'>Our Categories</th>
        </tr>
      </thead>
      <tbody className=''>
        {categoryList.map((category: string, key: number) => (
          <tr key={key} className='p-2 m-2 flex items-start font-mono capitalize  shadow-xl w-[120px]'>
            <td>{category.split('_').join(' ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default CategoriesList