
import CompaniesNav from '../layout/companiesNav';
import CategoryCards from '../layout/categoryCards';
import ProductsCards from '../layout/productsCards';

function HomePage() {
    return (
        <div className="page">
            <CompaniesNav />
            
            <div className="results-sum">
                <div id="total-results" className="container">
                </div>
            </div>
        </div>
    );
}

export default HomePage;
