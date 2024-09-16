const categoryValue: string[] = ['Все', 'Чарт', 'Жанры', 'Подборки'];

const Category = () => {
    return (
        <nav>
            <ul className="main__category">
                {categoryValue.map((value, index) => (
                    <li>
                        <button className="active">{value}</button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Category;
