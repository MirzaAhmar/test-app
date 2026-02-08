import { useParams } from 'react-router';
import { blogs, SellingProducts } from '../data/data';

const useGetProducts = () => {
    // Product
    const { id } = useParams()
    const producIndex = parseInt(id - 1)
    const product = SellingProducts[producIndex];
    
    // Blog
    const blogIndex = parseInt(id - 1);
    const blog = blogs[blogIndex];

    return (
        { product, blog }
    )
}

export default useGetProducts