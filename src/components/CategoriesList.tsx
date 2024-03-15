import categories from '../assets/categories.ts'

const CategoriesList = () => {
  const categoryList = categories.split(' ')

  return (
    <table className='category-list'>
      <tbody>
        {categoryList.map((category: string, key: number) => (
          <tr key={key} className='p-2 m-2 flex items-start font-mono capitalize shadow-xl w-[120px]'>
            <td>{category.split('_').join(' ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default CategoriesList