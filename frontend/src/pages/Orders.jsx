import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import Title from "../components/Title"
import axios from "axios"
import { useAuthStore } from "../context/authStore"
import toast from "react-hot-toast"

const Orders = () => {
  const { backendUrl, currency, navigate } = useContext(ShopContext)
  const { isAuthenticated, isCheckingAuth, checkAuth } = useAuthStore();
  const [orderData, setOrderData] = useState([])
  const [loading, setLoading] = useState(true);

  const loadOrderData = async () => {
    try {
      if (!isAuthenticated) return null
      const response = await axios.post(backendUrl + "/api/order/user-orders", {}, { withCredentials: true })
      if (response.data.success) {
        let allOrdersItem = []
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status
            item["payment"] = order.payment
            item["paymentMethod"] = order.paymentMethod
            item["date"] = order.date
            allOrdersItem.push(item)
          })
        })
        setOrderData(allOrdersItem.reverse())
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (isCheckingAuth) return;
    if (!isAuthenticated) {
      setLoading(false);
      navigate("/login");
      return;
    }
    loadOrderData();
  }, [isAuthenticated, isCheckingAuth]);

  if (loading) {
    return (
      <div className="pt-16 min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="text-3xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div>
        {
          orderData.map((item, index) => (
            <div key={index} className="py-4 border-t text-(--text-color) flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-start gap-6 text-sm">
                <img src={item.image[0]} className="w-16 sm:w-20" />
                <div>
                  <p className="sm:text-base font-medium">{item.name}</p>
                  <div className="flex items-center gap-3 mt-1 text-base">
                    <p>{currency}{item.price}</p>
                    <p>Quantity : {item.quantity}</p>
                    <p>Size : {item.size}</p>
                  </div>
                  <p className="mt-1">Expected Delivery : <span className="text-(--text3-color)">{new Date(new Date(item.date).setDate(new Date(item.date).getDate() + 7)).toDateString()}</span></p>
                  <p className="mt-1">Payment : <span className="text-(--text3-color)">{item.paymentMethod}</span></p>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                  <p className="text-sm md:text-base">{item.status}</p>
                </div>
                <button onClick={loadOrderData} className="border cursor-pointer px-4 py-2 text-sm font-medium rounded-sm">Track order</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders