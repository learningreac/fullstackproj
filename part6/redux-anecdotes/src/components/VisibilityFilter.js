import { useDispatch } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const Filter = () => {
    const dispatch = useDispatch();

    const handleChange = (e) => {
        dispatch(setFilter(e.target.value))
         console.log(e.target.value)
     }

     const style = {
        marginBottom: 10
      }
    

    return (
        <div style={style}>
            <form>
                <label>Filter</label>
                <input onChange={handleChange} /> 
            </form>
        </div>
    )
}

export default Filter;