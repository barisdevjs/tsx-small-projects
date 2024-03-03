# E-Commerce App

Core features used in this web app :

- React
- React-router-dom ==> `createBrowserRouter`
- Typescript ==> `Strict types`
- Ant Design
- Redux ==> `createAsyncThunk`

## [Demo](https://redux-sample.netlify.app/)

- You will need this password: barisdevjs

## Some features

```js
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        path: "/" /*Authorized Only*/,
        element: <Home /> /*password: barisdevjs*/,
      },
      {
        path: "/form" /*Public*/,
        element: <MultiStepFrom />,
      },
      /* Other routes*/
    ],
  },
]);
```
