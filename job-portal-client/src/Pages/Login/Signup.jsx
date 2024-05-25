import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Form, Input, Button, Select, Spin, message } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { register } from "../../services/apiCalls";

function Signup() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const registerSuccess = () => {
    messageApi.open({
      type: "success",
      content: "You are now registered.",
      duration: 3,
    });
  };

  const registerError = () => {
    messageApi.open({
      type: "error",
      content: "You are not registered",
      duration: 3,
    });
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Please enter your email"),
    password: Yup.string()
      .required("Please enter your password")
      .min(8, "Password must be at least 8 characters long") // Minimum length
      .matches(/[a-z]/, "Password must contain at least one lowercase letter") // At least one lowercase letter
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter") // At least one uppercase letter
      .matches(/[0-9]/, "Password must contain at least one number") // At least one number
      .matches(
        /[@$!%*#?&]/,
        "Password must contain at least one special character (@, $, !, %, *, #, ?, &)"
      ), // At least one special character
    username: Yup.string().required("Please enter your first name"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSignUp = async (data) => {
    setIsLoading(true);
    try {
      await register({
        username: data.username,
        email: data.email,
        password: data.password,
      });
      registerSuccess();
      setIsLoading(false);
      navigate("/login");
    } catch (error) {
      registerError();
      setIsLoading(false);
    }
  };

  return (
    <Row justify="center">
      {contextHolder}

      <Col xxl={6} xl={8} md={12} sm={18} xs={24}>
        <div className="px-5 py-4 text-center border-b border-gray-200 dark:border-white10">
          <h2 className="mb-0 text-xl font-semibold text-dark dark:text-white87">
            Sign Up
          </h2>
        </div>
        <div className="px-10 pt-8 pb-6">
          <Form name="register" layout="vertical">
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <Form.Item
                  label="Username*"
                  validateStatus={errors.username ? "error" : ""}
                  help={errors.username?.message}
                  className="[&>div>div>label]:text-sm [&>div>div>label]:text-dark dark:[&>div>div>label]:text-white60 [&>div>div>label]:font-medium"
                >
                  <Input {...field} placeholder="Enter your user name" />
                </Form.Item>
              )}
            />

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
                  <Input {...field} placeholder="Enter you email" />
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
                  <Input.Password {...field} placeholder="Password" />
                </Form.Item>
              )}
            />
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              <p>Password must contain:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>At least 8 characters</li>
                <li>At least one uppercase letter (A-Z)</li>
                <li>At least one lowercase letter (a-z)</li>
                <li>At least one number (0-9)</li>
                <li>At least one special character (@, $, !, %, *, #, ?, &)</li>
              </ul>
            </div>

            <Form.Item>
              <Button
                className="w-full h-12 p-0 my-6 text-sm font-medium"
                htmlType="submit"
                type="primary"
                size="large"
                onClick={handleSubmit(onSignUp)}
                disabled={false}
              >
                {isLoading ? `Creating...` : `Create Account`}
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="p-6 text-center bg-gray-100 dark:bg-white10 rounded-b-md">
          <p className="mb-0 text-sm font-medium text-body dark:text-white60">
            Already have an account?
            <Link
              to="/login"
              className="ltr:ml-1.5 rtl:mr-1.5 text-info hover:text-primary"
            >
              Sign In
            </Link>
          </p>
        </div>
      </Col>
    </Row>
  );
}

export default Signup;
