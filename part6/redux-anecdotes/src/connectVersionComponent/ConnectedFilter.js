import { connect } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const Filter = (props) => {

    const handleChange = (e) => {
        props.setFilter(e.target.value)
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
    setFilter  // short version of object , key and value has same name, with the help of object literal
} // simple version of mapDispatchToProps

const ConnectedFilter  =  connect(
    null,
    mapDispatchToProps
)(Filter)
export default ConnectedFilter;