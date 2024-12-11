import { usestate } from react;
import "./app.css";

export default function app(){
    const [count , setCount] = usestate(0);

    function onClickHandler(){
        setCount(count+1);
    }

    return 
    <div>
        <button onClick={onClickHandler}>
            Counter {count}
        </button>
    </div>
}