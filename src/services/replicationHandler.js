import axios from 'axios';

const replicateFromSQL = (db, replicationUrl, time = 10000) => {
    return setInterval(async () => {
        let { data } = await axios.get(replicationUrl);
        await db.bulkDocs({ docs: data });
    }, time)
};

export default replicateFromSQL;