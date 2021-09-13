import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-complete-guide-bc77b-default-rtdb.europe-west1.firebasedatabase.app/cart.json"
      );

      if (!response.ok) {
        throw new Error("Could not fetch cart data");
      }

      const data = await response.json();

      return data;
    };

    try {
      const cartData = await fetchData();
        console.log(cartData)
      dispatch(cartActions.replaceCart({items: cartData.items || [], totalQuantity: cartData.totalQuantity}));
    } catch (error) {
      uiActions.showNotification({
        status: "error",
        title: "Error!",
        message: "Fetching cart data failed!",
      });
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://react-complete-guide-bc77b-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
        { method: "PUT", body: JSON.stringify({items: cart.items, totalQuantity: cart.totalQuantity}) }
      );

      if (!response.ok) {
        throw new Error("Sent cart data failed");
      }
    };

    try {
      await sendRequest();
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data !",
        })
      );
    }

    dispatch(
      uiActions.showNotification({
        status: "success",
        title: "Success",
        message: "Sent cart data!",
      })
    );
  };
};
