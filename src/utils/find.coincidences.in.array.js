export default (user_data, db_data) => {
    const duplicates = [];

    for (let i = 0; i < db_data.length; i++) {
        const db_item = db_data[i];

        for (const key in db_item) {
            if (db_item[key] === user_data[key] && !duplicates.includes(key)) {
                duplicates.push(key);
            }
        }
    }

    return duplicates;
}
