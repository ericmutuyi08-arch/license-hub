import { Link } from 'react-router-dom';
import { categories } from '@/data/giftCards';
import { Card, CardContent } from '@/components/ui/card';

const CategorySection = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Shop by Category</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Find the perfect gift card from our curated collection of top brands
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link key={category.id} to={`/catalog?category=${category.id}`}>
              <Card className="group h-full transition-all duration-300 hover:shadow-hover hover:-translate-y-1 hover:border-primary/50">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <p className="font-medium text-sm group-hover:text-primary transition-colors">
                    {category.name}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
