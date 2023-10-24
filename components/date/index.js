import { parseISO, format } from "date-fns";

const Date = ({ dateString }) => {
  const date = parseISO(dateString);
  return <time>{format(date, "i MMM yy")}</time>;
};
export default Date;
