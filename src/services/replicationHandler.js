import axios from 'axios';
import config from '../config';

class Replication {
    constructor(db, replicationUrl, storageKey, time = 10000) {
        this.db = db;
        this.replicationUrl = replicationUrl;
        this.storageKey = storageKey;

        this.tryReplication = this.tryReplication.bind(this);
        this.stopReplication = this.stopReplication.bind(this);

        this.tryReplication().then(() => {
            this.interval = window.setInterval(this.tryReplication, time);
        })

    }

    stopReplication() {
        window.clearInterval(this.interval);
        window.localStorage.removeItem(this.storageKey);
    }

    async tryReplication() {
        if (localStorage.getItem(this.storageKey) < new Date()) {
            try {
                let { data } = await axios.get(this.replicationUrl);
                await this.db.bulkDocs({ docs: data });
                localStorage.setItem(this.storageKey, this.getNextReplicationDate());
            } catch (err) {
                if (err.response) {
                    console.log(err)
                }// else no response received that means the user is offline (or the server is not working)
            }
        }

    }

    getNextReplicationDate() {
        let replicationHour = config.replication_starting_hour // at 9am every morning the new data is here we have to refetch it
        let date = new Date();
        let nextDate = new Date(date.getFullYear(), date.getMonth(), date.getDay(), replicationHour)
        if (date.getHours() >= replicationHour) {
            nextDate.setDate(nextDate.getDate() + 1);
        }
        return nextDate;
    }
}

const replicateFromSQL = (db, replicationUrl, storageKey) => {
    return new Replication(db, replicationUrl, storageKey)
};

export default replicateFromSQL;