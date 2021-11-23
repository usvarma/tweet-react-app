
import React from "react";
import { Form, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const LoginSignUp = () => {
  const navigate = useNavigate();
  let userLoggedIn = false;
  let isAuthenticated = function(userName,password){
                            if(userName === 'test@test.com' && password === 'Test@1test')
                            userLoggedIn = true;
                          }

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmitLogin = (data) => {
                                      let {userName,password} = data;
                                      isAuthenticated(userName,password);
                                      
                                      if(userLoggedIn)
                                        navigate('/user/tweets');
                                      else
                                        navigate('/');
                                  }

  return (
            
                  <><h1>Log In</h1>
                  <Form onSubmit={handleSubmit(onSubmitLogin)}>
                    <Form.Field>
                      <label id="userNameLbl">User Name</label>
            
                      <input type="text" id="userName" {...register("userName", { 
                        required: true, 
                        maxLength: 25, 
                        pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ 
                        })} 
                        placeholder="Enter your username to login">

                      </input>
            
                    </Form.Field>
                    {errors.userName && <p>Please enter an username</p>}
            
                    <Form.Field>
            
                      <label id="passwordLbl">Password</label>
                      <input type="password" id="password" {...register("password", { 
                            required: true, 
                            pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
                            })} 
                            placeholder="Enter your password">

                      </input>
            
                    </Form.Field>
                    {errors.password && <p>Password should contain atleast a capital letter, a small letter and must be 6 chars, max 15 chars</p>}
                    <div>
                      <Button type="submit" id="submitBtn">Log In</Button>
                    </div>
            
                  </Form>
                  <div>
                  <span>Not registered?</span>
                  <Link to="/user/register">
                  <Button type="submit" id="signUpBtn">Sign Up</Button>
                  </Link>
              
                  </div></>
              
          );

      
    };
    
    export default LoginSignUp;