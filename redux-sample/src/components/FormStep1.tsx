import { Checkbox, Form, Input } from "antd";

type TFieldType = {
    username?: string;
    password?: string;
    remember?: string;
  };

function FormStep1  () {

  return (
    <>
    <Form.Item<TFieldType>
      label="Username"
      name="username"
      rules={[{ required: true, message: 'Please input your username!' }]}
      wrapperCol={{ offset: 0, span: 24 }}
    >
      <Input />
    </Form.Item>

    <Form.Item<TFieldType>
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
      wrapperCol={{ offset: 0, span: 24 }}
    >
      <Input.Password />
    </Form.Item>


    <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The new password that you entered do not match!'));
            },
          }),
        ]}
        wrapperCol={{ offset: 0, span: 24 }}
      >
        <Input.Password />
      </Form.Item>
    

    <Form.Item<TFieldType>
      name="remember"
      valuePropName="checked"
      wrapperCol={{ offset: 0, span: 24 }}
    >
      <Checkbox>Remember me</Checkbox>
    </Form.Item>
    </>
  );
};

export default FormStep1;
