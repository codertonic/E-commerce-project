import {it,expect,vi,describe,beforeEach} from 'vitest';
import {Product} from './Product';
import { render,screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
vi.mock('axios') 
describe('Product Components',()=>{
  var product; 
  
  // In vitest  vi =>  used to create the fake function 
    var loadCart;
    var User;
    beforeEach(()=>{
      product={
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    image: "images/products/athletic-cotton-socks-6-pairs.jpg",
    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    rating: {
      stars: 4.5,
      count: 87
    },
    priceCents:1090,
    keywords: ["socks", "sports", "apparel"]
  };
   loadCart=vi.fn();
     User=userEvent.setup();
  })
    it('test the Product details Correctly',()=>{
        
      render(<Product product={product} loadCart={loadCart}/>);
      expect(screen.getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')).toBeInTheDocument() ;
     
      expect(
        screen.getByText('$10.90' )).toBeInTheDocument();
        expect(
            screen.getByTestId('product-Image')).toHaveAttribute('src','images/products/athletic-cotton-socks-6-pairs.jpg');
        expect(
          screen.getByTestId('rating-test')
        ).toHaveAttribute('src','images/ratings/rating-45.png');
        expect(
          screen.getByText('87')
        ).toBeInTheDocument();        
    })



    // This test is used to check the click event ;
    it('test the click event ',async()=>{
  
  render(<Product product={product} loadCart={loadCart} />);
      
       const getEvent=screen.getByTestId('check-click')
      await User.click(getEvent);
       // write the expect function to click to check the data;
       expect(axios.post).toHaveBeenCalledWith(
        '/api/cart-items',
        {
                productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity:1
        }
       )
       expect(loadCart).toHaveBeenCalled();
       
    })
    it('check whether quantity value is crt',async()=>{
      render(<Product product={product} loadCart={loadCart}/>);
      const checkselector=screen.getByTestId('productCon')
      expect(checkselector).toHaveValue('1')

      // const userVal=userEvent.setup();
           await User.selectOptions(checkselector,'3');
           expect(checkselector).toHaveValue('3')
            //Write the fun to check the add to cart btn
            const Addbtn=screen.getByTestId('check-click');
               await User.click(Addbtn)
            expect(axios.post).toHaveBeenCalledWith(
            '/api/cart-items',
            {
              productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
              quantity :3
            }
            )
            // expect(loadCart).toHaveBeenCalled();
    })
})