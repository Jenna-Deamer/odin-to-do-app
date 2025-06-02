import { format } from 'date-fns'

export const formatDate = (dateToFormat) =>{
return format(dateToFormat, "dd MMM, yy")

}