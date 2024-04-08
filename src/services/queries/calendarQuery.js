import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getCalendar } from '../Calendar';
import { QUERY_CALENDAR_KEY } from '../../constants/query';
export const useGetCalendarQuery = (userid) =>
    useQuery({
        queryKey: [QUERY_CALENDAR_KEY, userid],
        queryFn: () => getCalendar(userid).then((res) => res.data),
        staleTime: 20000,
        placeholderData: keepPreviousData,
        enabled: !!userid
    },
    );