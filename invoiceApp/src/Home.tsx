import { Col, Row, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {  InvoiceT, useInvoice } from './Context';
import { useTranslation } from 'react-i18next';
import EmailLink from './Mail';



const statusFilters =  [
      {
        text: 'Pending',
        value: 'Pending',
      },
      {
        text: 'Paid',
        value: 'Paid',
      },
      {
        text: 'Expired',
        value: 'Expired',
      }
]
const columns: ColumnsType<InvoiceT> = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: "Transaction Id",
        dataIndex: "id",
        key: "id",
        render :(value, record) => {
            return value.slice(0, -6).padEnd(value.length, "*");
        },
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'QTY',
        dataIndex: 'qty',
        key: 'qty',
        sorter: (a, b) => a.qty - b.qty,
        defaultSortOrder: 'descend',
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        sorter: (a, b) => a.price - b.price,
        defaultSortOrder: 'descend',
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
        sorter: (a, b) => a.amount - b.amount,
        defaultSortOrder: 'descend',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        onFilter: (value: string | number | boolean, record: InvoiceT) => record.status === value.toString(),
        filters: statusFilters
      },
      {
        title: 'Actions',
        key: 'actions',
        render: (_, record) => <EmailLink invoice={record} />,
        align:"center"
      },
];

function Home() {
    const { items } = useInvoice();
    const { t } = useTranslation();


    return (
        <Row gutter={[24,24]} justify={"center"} align={"middle"} className="mx-8 px-8 my-4">
            <Col span={24}>
                <Typography.Title level={4}>{t("allInvoices")}</Typography.Title>
            </Col>
            <Col span={24}>
                <Table 
                    columns={columns} 
                    dataSource={items} 
                    bordered
                    rowKey="id"
                    />
            </Col>
        </Row>
    )
}

export default Home