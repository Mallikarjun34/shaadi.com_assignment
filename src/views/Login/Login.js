import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import get from 'lodash/get';
import { useHistory } from "react-router-dom";
import {  useToasts } from 'react-toast-notifications';

const Login = (props) => {
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToasts();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("This field is required"),
    password: Yup.string().required("This field is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema), mode: "onTouched" };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  function onSubmit(data) {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);

      if(get(data,'username','') == 'foo' && get(data,'password','') == 'bar'){
        history.push("/home");
      }else{
        addToast("Please enter valid credentials.", { appearance: 'error' });
      }      
    }, 2000);

  }

  return (
    <div className="p-4 d-flex justify-content-center align-items-center">

      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '300px' }} >
        <div className="form-group">
          <label>Username</label>
          <input
            id="username"
            name="username"
            placeholder="Username"
            type="text"
            {...register("username")}
            className={`form-control ${errors.username ? "is-invalid" : ""
              }`}
            autoComplete="off"
          />
          <div className="position-absolute text-danger">
            {errors.username?.message}
          </div>        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            {...register("password")}
            className={`form-control ${errors.password ? "is-invalid" : ""
              }`} placeholder="Password" />
          <div className="position-absolute text-danger">
            {errors.password?.message}
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Submit
         { isLoading ? (<span className="spinner-border spinner-border-sm ml-2" role="status" aria-hidden="true"></span>) :''}
        </button>
      </form>

    </div>
  );
}

export default Login;
