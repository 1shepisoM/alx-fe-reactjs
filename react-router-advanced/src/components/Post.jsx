import { useParams } from "react-router-dom";

export default function Post() {
  const { id } = useParams();
  return <h3>Post ID: {id}</h3>;
}