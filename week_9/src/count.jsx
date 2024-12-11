import { useEffect } from "react";
import { usestate } from "react";

function cnt(){
    const [count , setCount] = usestate(0);

function increment(){
    setCount(prev=>prev+1);
}

useEffect(function(){
    setInterval(increment,1000)
},[])

return <div>
        {count}
        </div>
}

export default cnt
