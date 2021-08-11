import moment from "moment";
import Moment from "react-moment";

const calculateTime = (createdAt) => {
    const today = moment(Date.now());
    const postDate = moment(createdAt);
    const timeDiff = today.diff(postDate, 'days');

    if (timeDiff < 1) {
        return (
            <>
                Today <Moment format="hh:mm A">{ createdAt }</Moment>
            </>
        )
    }
    else if (timeDiff > 1 && timeDiff < 2) {
        return (
            <>
                Yesterday <Moment format="hh:mm A">{ createdAt }</Moment>
            </>
        )
    }
    else if (timeDiff > 2) {
        return (
            <Moment format="DD/MM/YYYY hh:mm A">{ createdAt }</Moment>
        )
    }
}

export default calculateTime;