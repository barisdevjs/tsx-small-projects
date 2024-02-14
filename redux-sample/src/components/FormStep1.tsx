import { Form, Input, Tooltip } from "antd";
import { TFieldType } from "../types/generalTypes";

function FormStep1() {
  return (
    <>
      <Form.Item<TFieldType>
        label="Username"
        name="username"
        hasFeedback
        validateTrigger="onBlur"
        rules={[{ required: true, message: "Please input your username!" }]}
        wrapperCol={{ offset: 0, span: 24 }}
      >
        <Input />
      </Form.Item>
      <Tooltip
        trigger={["focus"]}
        title={"P@ssw0rd!"}
        placement="left"
        overlayClassName="numeric-input"
      >
        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: "Please input your password!" },
            { min: 8, message: "Password must be at least 8 characters long!" },
            {
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
              message:
                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character!",
            },
          ]}
          wrapperCol={{ offset: 0, span: 24 }}
        >
          <Input.Password />
        </Form.Item>
      </Tooltip>
      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The new password that you entered do not match!")
              );
            },
          }),
        ]}
        wrapperCol={{ offset: 0, span: 24 }}
      >
        <Input.Password />
      </Form.Item>
    </>
  );
}

export default FormStep1;
