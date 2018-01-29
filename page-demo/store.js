/**
 * {{demo}} 页面 store文件
 * {{date}}
 */

 import { observable, useStrict } from 'mobx';
 // import Ajax from 'ajax';

 useStrict(true);

 class Store {
   id = Math.random();
   @observable loadStatus = 1;
 }

 let store = null;
 const getInstance = () => {
   if (!store) {
     store = new Store();
   }
   return store;
 };

 export default getInstance();
