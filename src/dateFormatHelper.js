import { format, parse } from 'date-fns'

export const formatDate = (dateToFormat) =>{
let parsedDate = parse(dateToFormat, 'yyyy-MM-dd', new Date());
return format(new Date(parsedDate), 'MMMM dd, yyyy');
}