# Redux-Sample

##  [Demo](https://redux-sample.netlify.app/)

### React + TypeScript + Redux + react-router-dom + Ant Design +Vite

- Only persons who have the password via e-mail can open the restricted
base url route.Other pages are public.

Core features used in this web app :

- React
- React-router-dom  ==> `createBrowserRouter`
- Typescript        ==> `Strict types` 
- Ant Design        
- Redux             ==> `createAsyncThunk` 


## Some features

- New Router is configured like this :

```js
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        path: "/", /*Authorized Only*/
        element: <Home />,
      },
      {
        path: "/form", /*Public*/
        element: <MultiStepFrom />,
      },
      /* Other routes*/
    ],
  },
]);
```

