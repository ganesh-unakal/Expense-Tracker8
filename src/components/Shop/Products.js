import ProductItem from './ProductItem';
import classes from './Products.module.css';


const DUMMY_PROD = [{
  id: 'p1', price: 1000, title: 'robot', description: 'frist robot'
},
{
  id: 'p2', price: 200, title: 'keyboard', description: 'second keyboard'
}]




const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PROD.map((item) => (
          <ProductItem
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            description={item.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
