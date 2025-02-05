
import CompaniesNav from '../layout/companiesNav';
import CategoryCards from '../layout/categoryCards';
import ProductsCards from '../layout/productsCards';

function HomePage() {
    return (
        <div className="page">
            <CompaniesNav />
            <CategoryCards />
        </div>
    );
}

export default HomePage;
