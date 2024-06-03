import { lazy, Suspense } from "react";
import { ReactDOM } from "react-dom";

//  ** Redux Imports
import { Provider } from "react-redux";
import { store } from "./redux/store";

// ** Int1 & ThemeColors Context
import { ToastContainer } from "react-toastify";
import { ThemeContext } from "./utility/context/ThemeColors";
// ** Ripple Button
import "./@core/components/ripple-button";
// ** PrimJS
import "prismjs";
import "prismjs/components/prism-jsx.min";
import "prismjs/themes/prism-tomorrow.css";
// ** React Perfect Scrollbar
import "react-perfect-scrollbar/dist/css/styles.css";
// ** React Toastify
import "@styles/react/libs/toastify/toastify.scss";
// ** Core styles
import "./@core/assets/fonts/feather/iconfont.css";
import "./@core/scss/core.scss";
// ** ServiceWorker
import HvlBackdrop from "./HvlBackdrop";
import * as serviceWorker from "./serviceWorker";
// ** Lazy load app
const LazyApp = lazy(() => import("./App"));
ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<HvlBackdrop backdropOpen={true} />}>
      <ThemeContext>
        <LazyApp />
        <ToastContainer newestOnTop />
      </ThemeContext>
    </Suspense>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
