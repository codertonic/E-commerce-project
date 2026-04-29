import {it,expect,vi,describe,beforeEach} from 'vitest';
import {HomePage} from './HomePage';
import { render,screen,within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
// mock the axios
vi.mock('axios');

describe('We gonna test the Home Page',()=>{
    let loadCart;
    let User;
    beforeEach(()=>{
        loadCart=vi.fn();
        User=userEvent.setup();
        axios.get.mockImplementation(async(urlPath)=>{
          if(urlPath==='/api/products')
          return {
        data:[
             {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    image: "images/products/athletic-cotton-socks-6-pairs.jpg",
    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    rating: {
      stars: 4.5,
      count: 87
    },
    priceCents: 1090,
    keywords: ["socks", "sports", "apparel"]
  },
  {
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    image: "images/products/intermediate-composite-basketball.jpg",
    name: "Intermediate Size Basketball",
    rating: {
      stars: 4,
      count: 127
    },
    priceCents: 2095,
    keywords: ["sports", "basketballs"]
  },
        ]}
        })
   })
    it('it display the product crtly',async ()=>{
       render( <MemoryRouter>
                  <HomePage cart={[]} loadCart={loadCart}/>
        </MemoryRouter>)
     const displaydata=   await screen.findAllByTestId('product-container');
    expect(displaydata.length).toBe(2)
    expect(
            within(displaydata[1]).getByText('Intermediate Size Basketball')
    ).toBeInTheDocument();
    
    

       
    });
    it('check whether add to cart btn work for these 2 products',async()=>{
        render(
          <MemoryRouter>
               <HomePage cart={[]} loadCart={loadCart} />
          </MemoryRouter>
        );
        const AccContain=await screen.findAllByTestId('product-container');

        // get the quantity selector for both product 1&2
      const Quan1=within(AccContain[0]).getByTestId('productCon')
        await User.selectOptions(Quan1,'2');
       const Quan2=within(AccContain[1]).getByTestId('productCon');
        await User.selectOptions(Quan2,'3');

        // get the btn for both product 1 &2;
        const btn1=within(AccContain[0]).getByTestId('check-click');
        
        await User.click(btn1);
        const btn2=within(AccContain[1]).getByTestId('check-click');
        
        await User.click(btn2);
        // Use axios for both product1&2;
        expect(axios.post).toHaveBeenNthCalledWith(1,
          '/api/cart-items',{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity:2
          }
        );
        expect(axios.post).toHaveBeenNthCalledWith(2,
          '/api/cart-items',{
            productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity:3
          }
        )
    })
})