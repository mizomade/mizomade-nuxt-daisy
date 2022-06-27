import { accountStore } from "./../store/accounts"

export default function({route,redirect}) {
    // If the user is not authenticated
    const stores = accountStore();
    // console.log(route.name,"ROUTE")

    if (!stores.isLoggedIn && route.name == 'accounts-Saved') {
      return redirect('/accounts/login')
    }
    if (!stores.isLoggedIn && route.name == 'accounts-Profile') {
        return redirect('/accounts/login')
      }
  

  
  }