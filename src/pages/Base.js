import CustomNavBar from "../components/CustomNavBar";

const Base=({title="Welcome to our website....", children})=>{
    return(
        <div className="container-fluid">
            <CustomNavBar></CustomNavBar>
            <h3>Welcome to our website</h3>
            <br></br><br></br>
            { children }
            <br/><br/><br/><br/><br/><br/>
            <h6>Thank you for visiting our website</h6>
        </div>
    )
}
export default Base;