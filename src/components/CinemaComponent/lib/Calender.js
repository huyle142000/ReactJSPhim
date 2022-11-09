const TOTAL_DATE_CALENDER = 8;

export const calender = () => {
    let calenderList = [];
    let currentDate = new Date();
    for (let i = 0; i < TOTAL_DATE_CALENDER - 1; i++) {
        calenderList.push({
            date: currentDate.getDate(),
            day: getDay(currentDate.getDay()),
        });
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return calenderList;
};

const getDay = (day) => {
    switch (day) {
        case 0:
            return "Sunday";

        case 1:
            return "Monday";

        case 2:
            return "Tuesday";

        case 3:
            return "Wednesday";

        case 4:
            return "Thursday";

        case 5:
            return "Friday";

        case 6:
            return "Saturday";

        default:
            break;
    }
};
