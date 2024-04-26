import { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Base from "./Base";
import { login } from '../services/auth-service';
import { doLogin, doLogout } from '../auth/auth';


const Login=()=>{

    const navigate = useNavigate()

    const[loginDetails, setLoginDetails] = useState({
        username:'',
        password:''        
    })

    const[error, setError] = useState({
        errors:{},
        isError:false
    })

    useEffect(() => {
        console.log(loginDetails)
    }, [loginDetails])

    const handleChange = (event, property) =>{
        setLoginDetails({...loginDetails,[property]:event.target.value})
    }

    const submitForm = (event) =>{
        event.preventDefault()

        //Client side validations
        if(loginDetails.username.trim() ==''){
            toast.error("Username is required !!")
            return;
        }
        if(loginDetails.password.trim() ==''){
            toast.error("Password is required !!")
            return;
        }

        //API call
        login(loginDetails).then( (jwtTokenData) => {
            console.log("Login Success, token ---" + jwtTokenData)

            //save token
            doLogin(jwtTokenData, () => {
                console.log("Login token saved to local storage")
                navigate("/home")
            })
            toast.success("Login Success ")
            
        }).catch( (error) => {
            console.log("Login Error -" + error) 
            if(error.response.status==400 || error.response.status==404){
                toast.error(error.response.data.message)
            }else{
                toast.error("Login Failed!")
            }
            setError({
                errors:error,
                isError:true
            })
        })
    }

    const resetData = () =>{
        setLoginDetails({
            username:'',
            password:''    
        })
    }

    return(
        <Base>
            <Container>
                <Row>
                    <Col sm={{size:6, offset:3}}>
                        <Card color="dark" outline="true">
                            <CardHeader><h4>Login here!</h4></CardHeader>
                            <CardBody>
                                <Form onSubmit={submitForm} outline="false">
                                <FormGroup>
                                    <Label for="username">Enter Username:</Label>
                                    <Input type="text" id="username" placeholder="Enter username"
                                        onChange={(e)=>handleChange(e, 'username')} value={loginDetails.username} ></Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">Enter Password:</Label>
                                    <Input type="password" id="password" placeholder="Enter password"
                                        onChange={(e)=>handleChange(e, 'password')} value={loginDetails.password} ></Input>
                                </FormGroup>
                                <Container>
                                    <Row>
                                        <Col><Button color="dark">Login</Button></Col>
                                        <Col><Button color="secondary" type="reset" onClick={resetData}>Reset</Button></Col>
                                    </Row>
                                </Container>
                            </Form>
                        </CardBody>
                    </Card>
                    </Col>
                </Row>
            </Container>
        </Base>
    );
};
export default Login;