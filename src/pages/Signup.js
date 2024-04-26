import { Button, ButtonGroup, Card, CardBody, CardHeader, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Base from './Base';
import { signUp } from '../services/auth-service';

const Signup=()=>{

    const[data, setData] = useState({
        role:'1',
        firstname:'',
        lastname:'',
        email:'',
        phonenumber:'',
        username:'',
        password:''        
    })

    const[error, setError] = useState({
        errors:{},
        isError:false
    })

    useEffect(() => {
        console.log(data)
    }, [data])

    const [roleSelected, setRole] = useState(null);

    const handleChange = (event, property) =>{
        //setRole({[property]:event.target.value})
        setData({...data,[property]:event.target.value})
    }

    const submitForm = (event) =>{
        event.preventDefault()
        //Client side validations
        /*if(error.isError){
            toast.error("Form data is invalid !!");
            setError({...error, isError:false})
            return;
        }*/

        //validations
        //API call
        console.log("role selected - " + data.role)
        signUp(data).then( (response) => {
            console.log("Signup Success - " + data)
            toast.success("User is Registered!")
        }).catch( (error) => {
            console.log("Signup Error -" + error)
            toast.error("Signup Failed!")
            if(error.response?.status==400 || error.response?.status==404){
                toast.error(error.response?.data.message)
            }else{
                toast.error("Signup Failed!")
            }
            setError({
                errors:error,
                isError:true
            })
        })
    }

    const resetData = () =>{
        setData({
            firstname:'',
            lastname:'',
            email:'',
            phonenumber:'',
            username:'',
            password:'',
            role:''    
        })
    }

    return(
        <Base>
            <Container>
                <Row className="mt-4">
                    {/*JSON.stringify(data)*/}
                    <Col sm={{size:6, offset:3}}>
                        <Card color="dark" outline="true">
                        <CardHeader>
                            <h4>Fill information to register!</h4>
                        </CardHeader>
                        <CardBody>
                            <Form onSubmit={submitForm} outline="false">
                            <FormGroup>
                                <Label for="firstname">Enter First Name:</Label>
                                <Input type="text" id="firstname" placeholder="Enter First Name"
                                    onChange={(e)=>handleChange(e, 'firstname')} value={data.firstname} 
                                    invalid={ error.errors?.response?.data?.firstname ? true : false } ></Input>
                                <FormFeedback>{error.errors?.response?.data?.firstname }</FormFeedback>
                            </FormGroup>

                            <FormGroup>
                                <Label for="lastname">Enter Last Name:</Label>
                                <Input type="text" id="lastname" placeholder="Enter Last Name"
                                    onChange={(e)=>handleChange(e, 'lastname')} value={data.lastname} 
                                    invalid={ error.errors?.response?.data?.lastname ? true : false } ></Input>
                                <FormFeedback>{error.errors?.response?.data?.lastname }</FormFeedback>
                            </FormGroup>

                            <FormGroup>
                               <Label for="role">Choose Role:</Label>
                               <br></br>
                                <ButtonGroup>
                                    <Button id="role" color="dark" outline 
                                        onClick={(e) => setRole(1)} active={roleSelected === 1} 
                                        onChange={(e)=>handleChange(e, 'role')} value="1">USER</Button>
                                    <Button id="role" color="dark" outline 
                                        onClick={(e) => setRole(2)} active={roleSelected === 2}
                                        onChange={(e)=>handleChange(e, 'role')} value="2">AFFILIATE</Button>
                                    <Button id="role" color="dark" outline 
                                        onClick={(e) => setRole(3)} active={roleSelected === 3}
                                        onChange={(e)=>handleChange(e, 'role')} value="3">ADMIN</Button>
                                </ButtonGroup>
                                <p>Selected: {roleSelected}</p>
                            </FormGroup>
                            
                            <FormGroup>
                                <Label for="email">Enter email id:</Label>
                                <Input type="email" id="email" placeholder="Enter Email Id"
                                    onChange={(e)=>handleChange(e, 'email')} value={data.email} 
                                    invalid={ error.errors?.response?.data?.email ? true : false }></Input>
                                <FormFeedback>{error.errors?.response?.data?.email }</FormFeedback>
                            </FormGroup>
                            
                            <FormGroup>
                                <Label for="phonenumber">Enter Phone Number:</Label>
                                <Input type="number" id="phonenumber" placeholder="Enter phone number"
                                    onChange={(e)=>handleChange(e, 'phonenumber')} value={data.phonenumber} 
                                    invalid={ error.errors?.response?.data?.phonenumber ? true : false }></Input>
                                <FormFeedback>{error.errors?.response?.data?.phonenumber }</FormFeedback>
                            </FormGroup>
                            
                            <FormGroup>
                                <Label for="username">Enter Username:</Label>
                                <Input type="text" id="username" placeholder="Enter username"
                                    onChange={(e)=>handleChange(e, 'username')} value={data.username} 
                                    invalid={ error.errors?.response?.data?.username ? true : false }></Input>
                                <FormFeedback>{error.errors?.response?.data?.username }</FormFeedback>
                            </FormGroup>
                            
                            <FormGroup>
                                <Label for="password">Enter Password:</Label>
                                <Input type="password" id="password" placeholder="Enter password"
                                    onChange={(e)=>handleChange(e, 'password')} value={data.password} 
                                    invalid={ error.errors?.response?.data?.password ? true : false }></Input>
                                <FormFeedback>{error.errors?.response?.data?.password }</FormFeedback>
                            </FormGroup>
                            
                            <Container>
                                <Row>
                                    <Col><Button color="dark" type='submit'>Register</Button>
                                    </Col>
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
export default Signup;