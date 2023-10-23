import { parseISO, format } from "date-fns";

const Date = ({ dateString }) => {
  const date = parseISO(dateString);
  return <time>{format(date, "d LLL yy")}</time>;
};
export default Date;
