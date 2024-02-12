import { Button, message, Steps, theme, Form } from "antd";
import { useState } from "react";
import { getFormStyles } from "../utils/styles";
import FormStep1 from "../components/FormStep1";
import FormStep2 from "../components/FormStep2";
import FormStep3 from "../components/FormStep3";

const steps: Record<string, string | JSX.Element>[] = [
  {
    title: "First",
    content: <FormStep1 />,
  },
  {
    title: "Second",
    content: <FormStep2 />,
  },
  {
    title: "Last",
    content: <FormStep3 />,
  },
];

function MultiStepFrom() {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const onFinish = async () => {
    // const values = await form.validateFields(Object.keys(initialData));
    console.log("values");
  }

  return (
    <>
      <Steps current={current} items={items} />
      <Form layout="vertical" initialValues={{ remember: true }} onFinish={onFinish} form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600, marginInline:"auto"}}
          
      >
        <div style={getFormStyles(token)}>{steps[current].content}</div>
      </Form>
      <div style={{ marginTop:"2rem", textAlign:"center" }}>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </>
  );
}

export default MultiStepFrom;
