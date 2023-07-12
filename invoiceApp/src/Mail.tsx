import { Button } from "antd";
import { InvoiceT } from "./Context";
import { MailOutlined } from "@ant-design/icons";

const EmailLink = ({ invoice }: { invoice: InvoiceT }) => {
  const { name, id, description, date, qty, price, amount, status } = invoice;

  const body = `Invoice Details:\n\nName: ${name}\nTransaction ID: ${id}\nDescription: ${description}\nDate: ${date}\nQTY: ${qty}\nPrice: ${price}\nAmount: ${amount}\nStatus: ${status}`;

  const mailtoLink = `mailto:barissavas17@gmail.com?subject=Invoice Test&body=${encodeURIComponent(body)}`;

  return (
    <Button icon={<MailOutlined />}>
      <a target="_blank" href={mailtoLink}>Send Details via Email</a>
    </Button>
  );
};

export default EmailLink;
