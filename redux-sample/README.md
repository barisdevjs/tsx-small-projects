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

# ScreenShots

![alt text](https://github.com/barisdevjs/tsx-small-projects/blob/main/redux-sample/public/screenshot-1.jpg)

![alt text](https://github.com/barisdevjs/tsx-small-projects/blob/main/redux-sample/public/screenshot-2.jpg)

![alt text](https://github.com/barisdevjs/tsx-small-projects/blob/main/redux-sample/public/screenshot-3.jpg)

![alt text](https://github.com/barisdevjs/tsx-small-projects/blob/main/redux-sample/public/screenshot-4.jpg)
