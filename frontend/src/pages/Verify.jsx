import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthStore } from "../context/authStore";

const Verify = () => {
  const { navigate, setCartItems, backendUrl } = useContext(ShopContext);
  const { isAuthenticated, checkAuth, isCheckingAuth } = useAuthStore();

  const [verified, setVerified] = useState(false);
  const [searchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const method = searchParams.get("method");
  const payment = searchParams.get("payment");

  const paymentLabel =
    method === "cod" ? "Pending" : payment === "paid" ? "Successful" : "Pending";

  const paymentColor =
    method === "cod"
      ? "text-yellow-600"
      : payment === "paid"
        ? "text-green-600"
        : "text-yellow-600";

  const verifyPayment = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/verifyStripe`,
        { success, orderId },
        { withCredentials: true }
      );

      if (response.data.success) {
        setCartItems({});
        setVerified(true);
      } else {
        navigate("/cart");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
      navigate("/cart");
    }
  };

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (isCheckingAuth) return;

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (method === "stripe" && success && orderId) {
      verifyPayment();
      return;
    }

    if ((method === "razorpay" || method === "cod") && success === "true") {
      setVerified(true);
      return;
    }

    if (success === "false") {
      navigate("/cart");
    }
  }, [isAuthenticated, isCheckingAuth, success, orderId, method]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] overflow-hidden border border-gray-100">

        <div className="bg-linear-to-r from-green-50 to-emerald-50 px-6 md:px-10 py-8 border-b border-green-100">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center shadow-inner">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="mt-5 text-2xl md:text-3xl font-bold text-gray-900">
              Order Placed Successfully
            </h1>

            <p className="mt-2 text-sm md:text-base text-gray-600 max-w-md">
              Thank you for shopping with Wearix. Your order has been confirmed and
              will be available in your orders section.
            </p>

            {orderId && (
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 border border-gray-200 text-sm text-gray-700 shadow-sm">
                <span className="font-medium text-gray-500">Order ID:</span>
                <span className="font-semibold text-gray-900">{orderId}</span>
              </div>
            )}
          </div>
        </div>

        <div className="px-6 md:px-10 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl bg-gray-50 border border-gray-100 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Status
              </p>
              <p className="mt-2 text-base font-semibold text-green-600">
                Confirmed
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 border border-gray-100 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Payment
              </p>
              <p className={`mt-2 text-base font-semibold ${paymentColor}`}>
                {paymentLabel}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 border border-gray-100 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Delivery
              </p>
              <p className="mt-2 text-base font-semibold text-gray-900">
                Updates in Orders
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-gray-100 bg-[#fcfcfc] p-5">
            <h2 className="text-base font-semibold text-gray-900">
              What happens next?
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li>• Your order is confirmed and being prepared.</li>
              <li>• You can track status updates from the Orders page.</li>
              <li>• A confirmation message will be sent for your purchase flow.</li>
            </ul>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate("/orders")}
              className="flex-1 bg-black text-white py-3.5 rounded-xl font-medium hover:bg-gray-900 transition"
            >
              View Orders
            </button>

            <button
              onClick={() => navigate("/collection")}
              className="flex-1 border border-gray-300 text-gray-800 py-3.5 rounded-xl font-medium hover:bg-gray-50 transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;