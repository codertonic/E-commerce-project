import {PaymentSummary} from './PaymentSummary';
import {MemoryRouter} from 'react-router';
import { render,screen } from '@testing-library/react';
import {it,expect,describe,beforeEach,vi} from 'vitest';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import {useLocation } from 'react-router'

describe('We gonna test the paymentSumary',()=>{
    vi.mock('axios');
    var loadCart;
    var PaymentSummery;
    var User
    beforeEach(()=>{
          loadCart=vi.fn();
           User=userEvent.setup();
          PaymentSummery= {totalItems:26,
            "productCostCents":83165,
            shippingCostCents:1998,
            totalCostBeforeTaxCents:85163,
            taxCents:8516,
            totalCostCents:93679}
            // we need to test expect totalItems in next class
    })
    it('test whether navigation is works',()=>{
      render(
        <MemoryRouter>
            <PaymentSummary PaymentSummery={PaymentSummery} loadCart={loadCart}/>
        </MemoryRouter>
      )  
      expect(
        screen.getByTestId('Amt')
      ).toHaveTextContent('Items (26)');
      expect(
        screen.getByTestId('shopAmt')
      ).toHaveTextContent('$19.98');
      expect(
      screen.getByTestId("payAmt")
    ).toHaveTextContent('$831.65')
     expect(
      screen.getByTestId('BtaxAmt')
    ).toHaveTextContent('$851.63');

    })
    // we gonna test the place order btn
    it('we gonna check the placeOrder btn',async()=>{
        function Location() {
          const location =useLocation();
          return <div data-testid="urlPath">{location.pathname}</div>
        }
        render(
          <MemoryRouter>
            <PaymentSummary loadCart={loadCart} PaymentSummery={PaymentSummery}/>
            <Location/>
          </MemoryRouter>
        )
        const btn=screen.getByTestId('Order-btn');
       await User.click(btn);
       expect(axios.post).toHaveBeenCalledWith('/api/orders');
       expect(loadCart).toHaveBeenCalled();
       expect(screen.getByTestId('urlPath')).toHaveTextContent('/orders')
          
       })
    })
   
    
// })