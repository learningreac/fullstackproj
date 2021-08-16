
import { setFilter } from "../reducers/filterReducer";

const Filter = (props) => {

    const handleChange = (e) => {
        dispatch(props.setFilter(e.target.value))
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

const mapDispatchToProps = {
    setFilter
}

const ConnectedFilter  =  connect(
    null,
    mapDispatchToProps
)(Filter)
export default ConnectedFilter;