import { useParams } from "react-router-dom";

export default function SingleProduct () {
const {id} = useParams();
console.log({id})
  return (
      <div>
        Sample Page
    </div>
  );
};

