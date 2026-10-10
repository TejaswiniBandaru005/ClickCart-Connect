
import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

const CustomerContext = createContext(null);

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function CustomerProvider({ children }) {
  const [profile, setProfile] = useState(() =>
    readStorage("shopsphere-profile", {
      name: "",
      email: "",
      phone: ""
    })
  );

  const [addresses, setAddresses] = useState(() =>
    readStorage("shopsphere-addresses", [])
  );

  const [orders, setOrders] = useState(() =>
    readStorage("shopsphere-orders", [])
  );

  const [settings, setSettings] = useState(() =>
    readStorage("shopsphere-settings", {
      emailNotifications: true,
      orderUpdates: true,
      promotions: false
    })
  );

  useEffect(() => {
    localStorage.setItem("shopsphere-profile", JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem("shopsphere-addresses", JSON.stringify(addresses));
  }, [addresses]);

  useEffect(() => {
    localStorage.setItem("shopsphere-orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("shopsphere-settings", JSON.stringify(settings));
  }, [settings]);

  function saveProfile(updatedProfile) {
    setProfile(updatedProfile);
  }

  function addAddress(address) {
    setAddresses((current) => [
      ...current,
      { ...address, id: Date.now() }
    ]);
  }

  function updateAddress(id, updatedAddress) {
    setAddresses((current) =>
      current.map((address) =>
        address.id === id
          ? { ...address, ...updatedAddress }
          : address
      )
    );
  }

  function deleteAddress(id) {
    setAddresses((current) =>
      current.filter((address) => address.id !== id)
    );
  }

  function placeOrder(items, total, address) {
    const order = {
      id: `SS${Date.now().toString().slice(-8)}`,
      items,
      total,
      address,
      status: "Placed",
      date: new Date().toISOString()
    };

    setOrders((current) => [order, ...current]);
    return order;
  }

  return (
    <CustomerContext.Provider
      value={{
        profile,
        saveProfile,
        addresses,
        addAddress,
        updateAddress,
        deleteAddress,
        orders,
        placeOrder,
        settings,
        setSettings
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomer() {
  const context = useContext(CustomerContext);

  if (!context) {
    throw new Error("useCustomer must be used inside CustomerProvider");
  }

  return context;
}