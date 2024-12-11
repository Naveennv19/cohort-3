import { useState } from "react";


function App() {
  return (
    <div style={{background: "#dfe6e9", height: "100vh" }}>
      <ToggleMessage />
    </div>
  )
}

const ToggleMessage = () => {
  let [notificationCount, setNotificationCount] = useState(0);

  console.log("re-render");
  function increment() {
    setNotificationCount(notificationCount + 1);
  }

  return (
      <div>
          <button onClick={increment}>
              Increase count
          </button>
          {notificationCount}
      </div>
  );
};

export default App
