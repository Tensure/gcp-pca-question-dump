import { Layout as AntLayout, Menu } from "antd";
import { Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const { Header, Content, Footer } = AntLayout;
  const items = [
    { key: "/", label: "Home" },
    { key: "/gcp_pca", label: "GCP PCA" },
  ];
  const navigate = useNavigate();
  return (
    <AntLayout>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" />
        <Menu
          mode="horizontal"
          items={items}
          style={{ flex: 1, minWidth: 0 }}
          onClick={(item) => {
            navigate(item.key);
          }}
        />
      </Header>
      <AntLayout style={{ padding: "0 24px 24px" }}>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Tensure © {new Date().getFullYear()}
        </Footer>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
