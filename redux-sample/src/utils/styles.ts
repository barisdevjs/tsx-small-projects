import { GlobalToken } from "antd";

export const getFormStyles = (token: GlobalToken) => {
  const contentStyle: React.CSSProperties = {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingInline: "4rem",
    paddingBlock: "2rem",
    width: "100%",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
    marginInline: "auto",
  };

  return contentStyle;
};
