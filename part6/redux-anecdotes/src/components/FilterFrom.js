import { useDispatch } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const Filter = () => {
    const dispatch = useDispatch();

    const filterChange = (e) => {
        dispatch(setFilter(e.target.value))
         console.log(e.target.value)
     }
    

    return (
        <div>
            <form>
                <label>Filter</label>
                <input onChange={filterChange} /> 
            </form>
        </div>
    )
}

export default Filter;