import { Button, Form, Input, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

function FormStep3() {
    return (
        <Form.List name="users" >
            {(fields, { add, remove }) => (
                <>
                    {fields.map(({ key, name, ...restField }) => (
                        <Space key={key} style={{ display: 'flex'}} align="baseline">
                            <Form.Item
                                {...restField}
                                name={[name, 'first']}
                                rules={[{ required: true, message: 'Missing first name' }]}
                            >
                                <Input placeholder="First Name" />
                            </Form.Item>
                            <Form.Item
                                {...restField}
                                name={[name, 'last']}
                                rules={[{ required: true, message: 'Missing last name' }]}
                            >
                                <Input placeholder="Last Name" />
                            </Form.Item>
                            <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                    ))}
                    <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                            Add Family Members
                        </Button>
                    </Form.Item>
                </>
            )}
        </Form.List>
    );
};

export default FormStep3;
