import { Col, Row, Typography, Button, Form, Input, InputNumber, Space,  DatePicker, Radio  } from 'antd'
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import type { DatePickerProps, RadioChangeEvent } from 'antd';
import dayjs from 'dayjs';
import { useInvoice } from './Context';
import { useTranslation } from 'react-i18next';


function NewInvoice() {

    const [form] = Form.useForm();
    const { addInvoice } = useInvoice();
    const navigate = useNavigate();
    const { t } = useTranslation();


    const onFinish = (values: any) => {
        const uuid = uuidv4();
        const formattedDate = dayjs(values.date?.$d).format('DD-MM-YYYY');
        const amount = values.qty * values.price;
        const updatedValues = {
            ...values,
            id: uuid,
            amount: amount,
            date: formattedDate,
        };
        addInvoice(updatedValues);
        onReset();
        navigate("/")
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    }

    const onReset = () => {
        form?.resetFields();
    };

    const onDateChange: DatePickerProps['onChange'] = (date, dateString) => {
        const formattedDate = dayjs(date).format('YYYY-MM-DD');
    };

    const initialVals = {
        name: "Test",
        description: "Initial description",
        date: dayjs(),
        qty: 5,
        price: 55.99,
        status: "Pending",
      }


    const optionsRadio = [
        {
          label: 'Pending',
          value: 'Pending',
        },
        {
          label: 'Paid',
          value: 'Paid',
        },
        {
          label: 'Expired',
          value: 'Expired',
          disabled: true,
        },
      ];

      const onChangeRadio = ({ target: { value } }: RadioChangeEvent) => {
        console.log('radio checked', value);
      };

    return (
        <Space direction='vertical'>
            <Row gutter={[24, 24]} justify={"start"} align={"middle"} className="mx-8 px-8 my-4">
                <Col span={24}>
                    <Typography.Title level={4}>{t("createNewInvoice")}</Typography.Title>
                </Col>
            </Row>
            <Form
                form={form}
                onReset={onReset}
                name="basic"
                labelCol={{ offset: 4 }}
                wrapperCol={{ offset: 4, span: 24 }}
                initialValues={initialVals}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout='vertical'
            >
                <Row justify={"start"} gutter={24} >
                    <Col>
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input the name!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Quantity"
                            name="qty"
                            rules={[{ required: true, message: 'Please input the description!' }]}
                        >
                            <InputNumber />
                        </Form.Item>
                        <Form.Item
                            label="Price"
                            name="price"
                            rules={[{ required: true, message: 'Price is required!' }]}
                        >
                            <InputNumber min={50} max={1000} step={50} />
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item
                            label="Status"
                            name="status"
                            rules={[{ required: true, message: 'Status is not defined!' }]}
                        >
                            <Radio.Group
                                options={optionsRadio}
                                onChange={onChangeRadio}
                                optionType="button"
                                buttonStyle="solid"
                            />

                        </Form.Item>
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{ required: true, message: 'Please input the description!' }]}
                        >
                            <Input.TextArea rows={5} />
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item label="Select Date" name="date"
                        rules={[{ required: true, message: 'Please select date!' }]}>
                            <DatePicker onChange={onDateChange} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={"start"} gutter={[96, 24]}>
                    <Col>
                        <Form.Item wrapperCol={{ offset: 24, span: 16 }}>
                            <Button type="dashed" htmlType="reset">
                                Reset
                            </Button>
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item wrapperCol={{ offset: 24 }}>
                            <Button type="primary" htmlType="submit" 
                                        disabled={
                                            !!form.getFieldsError().filter(({ errors }) => errors.length).length
                                          }
                            >
                                Submit
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Space>
    )
}

export default NewInvoice