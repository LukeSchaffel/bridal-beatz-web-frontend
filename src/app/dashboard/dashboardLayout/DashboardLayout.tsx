import { Layout } from "antd";

const { Header, Sider, Content, Footer } = Layout;

const DashboardLayout = () => {
  return (
    <Layout style={{ height: "100%" }}>
      <Header>header</Header>
      <Layout>
        <Sider>left sidebar</Sider>
        <Content>main content</Content>
      </Layout>
      <Footer>footer</Footer>
    </Layout>
  );
};

export default DashboardLayout;
