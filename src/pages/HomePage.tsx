
import CompaniesNav from '../layout/companiesNav';
import CategoryCards from '../layout/categoryCards';
import LocationNav from '../layout/locationNav';
import { useProducts } from '../products/components';
import lang from '../language/he/index.js'

function HomePage() {
    const { categories } = useProducts()
    return (
        <div>
            <CompaniesNav />
            <LocationNav noBreadcrumbs title={[
                {
                    title: lang.nav.home,
                    link : '/',
                },
                {
                    title: lang.category.titles.all,
                }
            ]} />
            <div className="page">            
                <CategoryCards categories={categories}/>
            </div>
        </div>
    );
}

export default HomePage;
