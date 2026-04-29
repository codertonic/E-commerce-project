import {it,expect,describe} from 'vitest';
import { formatMoney } from './money';

describe('formatMoney',()=>{
     it('formates 1333 cents as $13.33',()=>{
    expect(formatMoney(1333)).toBe('$13.33');
});

it('formates 2 decimal',()=>{
    expect(formatMoney(1030)).toBe('$10.30');
    expect(formatMoney(100)).toBe('$1.00')
    expect(formatMoney(0)).toBe('$0.00')
    expect(formatMoney(-999)).toBe('$-9.99')
    expect(formatMoney(-100)).toBe('$-1.00')
})
})
