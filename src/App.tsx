import './App.css';
import { ProductProvider } from 'products/components/ProductsProvider';
import MainNav from './layout/mainNav';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import CompanyPage from './pages/CompanyPage';
import ProductPage from './pages/ProductPage';
import CompaniesNav from './layout/companiesNav';
import ProductsNav from './layout/ProductsNav';

function App() {
    return (
    <ProductProvider>
        <div className="App">
                <Router>
                    <MainNav />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                        <Route exact path="/category/:categoryName" component={CategoryPage} />
                        <Route exact path="/company/:companyName" component={CompanyPage} />
                        <Route exact path="/company/:companyName/:categoryName" component={CategoryPage} />
                        <Route exact path="/category/:categoryName/:productId" component={ProductPage} />
                        <Route exact path="/company/:companyName/:categoryName/:productId" component={ProductPage} />
                </Switch>
            </Router>
        </div>
    </ProductProvider>
  );
}

export default App;
