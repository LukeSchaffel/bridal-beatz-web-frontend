import { Form, Input, Typography, Button, Col, Row } from "antd";
import "./_login_screen.css";

const LoginScreen = () => {
  const [form] = Form.useForm();

  return (
    <div className="login-screen">
      <Typography.Title>Welcome to my app</Typography.Title>
      <div>
        <Form layout="vertical" className="login-form">
          <Row>
            <Col span={24}>
              <Form.Item name={"email"} label="Email address">
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name={"password"} label="Password">
                <Input.Password />
              </Form.Item>
            </Col>
          </Row>
          <Col>
            <Row align="middle" justify="end">
              <Button type="link" danger>
                Forgot password
              </Button>
            </Row>
            <Row align="middle" justify="center">
              <Button
                type="primary"
                color="danger"
                size="large"
                style={{ width: "100%" }}
              >
                Login
              </Button>
            </Row>
            <Row justify="center" align="middle">
              <Typography.Text>Don't have an account?</Typography.Text>{" "}
              <Button type="link">Create one now.</Button>
            </Row>
          </Col>
        </Form>
      </div>
    </div>
  );
};

export default LoginScreen;
