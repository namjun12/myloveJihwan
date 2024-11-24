import { atom } from "recoil";

export const LoginInfoAtom = atom({
   key: 'LoginInfoAttom',
   default: null
})

export const CartItemsAtom = atom({
   key: 'CartItemsAtom',
   default: {
      items: [],
      total: {
         count: 0,
         price: 0,
      }
   }
})

export const authState = atom({
   key: 'authState',
   default: null,
})