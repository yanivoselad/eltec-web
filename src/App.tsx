import './App.css';
import { ProductProvider } from 'products/components/ProductsProvider';
import MainNav from './layout/mainNav';
import CompaniesNav from './layout/companiesNav';
import CategoryCards from './layout/categoryCards';
import ProductsCards from './layout/productsCards';

function App() {
    return (
    <ProductProvider>
        <div className="App">
            <MainNav />
            <CompaniesNav />
            <CategoryCards/>
            <div className="results-sum">
                <div id="total-results" className="container">
                </div>
            </div>
            <ProductsCards/>
        </div>
    </ProductProvider>
  );
}

export default App;
