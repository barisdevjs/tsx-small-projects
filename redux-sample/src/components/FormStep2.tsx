import { Form, Input, Select } from "antd";

const { Option } = Select;

const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select style={{ width: 70 }} defaultValue={"+90"}>
      <Option value="90">+90</Option>
      <Option value="91">+91</Option>
      <Option value="92">+92</Option>
    </Select>
  </Form.Item>
);
function FormStep2() {
  return (
    <>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
        wrapperCol={{ offset: 0, span: 24 }}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[{ required: true, message: "Please input your phone number!" }]}
        wrapperCol={{ offset: 0, span: 24 }}
      >
        <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        name="gender"
        label="Gender"
        rules={[{ required: true, message: "Please select gender!" }]}
        wrapperCol={{ offset: 0, span: 24 }}
      >
        <Select placeholder="select your gender">
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
          <Option value="other">Other</Option>
        </Select>
      </Form.Item>
    </>
  );
}

export default FormStep2;
