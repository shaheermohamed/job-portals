/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Form, Input, Button, Row, Col, message } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { login } from "../../services/apiCalls";
import { AuthContext } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(false);
  const { setToken } = useContext(AuthContext);

  const loginSuccess = () => {
    messageApi.open({
      type: "success",
      content: "Welcome back! You are now logged in to your account.",
      duration: 3,
    });
  };

  const loginError = () => {
    messageApi.open({
      type: "error",
      content: "Invalid credentials! Please check your username and password.",
      duration: 3,
    });
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Please enter your email"),
    password: Yup.string().required("Please enter your password"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onLogin = async (data) => {
    setIsLoading(true);
    try {
      const result = await login({
        email: data.email,
        password: data.password,
      });
      loginSuccess();
      console.log("login result:", result);
      setToken(result.token);
      localStorage.setItem("token", result.token);
      navigate("/");
      setIsLoading(false);
    } catch (error) {
      loginError();
      console.log("error occured in login:", error);
      setIsLoading(false);
    }
  };

  return (
    <Row justify="center">
      <Col xxl={6} xl={8} md={12} sm={18} xs={24}>
        {contextHolder}
        <div className="mt-6 bg-white rounded-md dark:bg-white10 shadow-regular dark:shadow-none">
          <div className="px-5 py-4 text-center border-b border-gray-200 dark:border-white10">
            <h2 className="mb-0 text-xl font-semibold text-dark dark:text-white87">
              Sign in
            </h2>
          </div>
          <div className="px-10 pt-8 pb-6">
            <Form name="login" layout="vertical">
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Form.Item
                    label="Email Address *"
                    validateStatus={errors.email ? "error" : ""}
                    help={errors.email?.message}
                    className="[&>div>div>label]:text-sm [&>div>div>label]:text-dark dark:[&>div>div>label]:text-white60 [&>div>div>label]:font-medium"
                  >
                    <Input
                      {...field}
                      className="h-10 px-3 placeholder-gray-400"
                    />
                  </Form.Item>
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Form.Item
                    label="Password *"
                    validateStatus={errors.password ? "error" : ""}
                    help={errors.password?.message}
                    className="[&>div>div>label]:text-sm [&>div>div>label]:text-dark dark:[&>div>div>label]:text-white60 [&>div>div>label]:font-medium"
                  >
                    <Input.Password
                      {...field}
                      className="h-10 px-3 placeholder-gray-600"
                    />
                  </Form.Item>
                )}
              />
              <div className="flex flex-wrap items-center justify-between gap-[10px]">
                <NavLink className=" text-primary text-13" to="/forgotPassword">
                  Forgot password?
                </NavLink>
              </div>
              <Form.Item>
                <Button
                  className="w-full h-12 p-0 my-6 text-sm font-medium"
                  htmlType="submit"
                  type="primary"
                  size="large"
                  onClick={handleSubmit(onLogin)}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Sign In"}
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="p-6 text-center bg-gray-100 dark:bg-white10 rounded-b-md">
            <p className="mb-0 text-sm font-medium text-body dark:text-white60">
              Don&apos;t have an account?
              <Link
                to="/signup"
                className="ltr:ml-1.5 rtl:mr-1.5 text-info hover:text-primary"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default Login;
