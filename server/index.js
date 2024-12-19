const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db')();
const bodyParser = require('body-parser');

const PORT = 9000;

app.use(cors());
app.use(bodyParser.json());

function dynamicGet(...arguments) {
    const args = arguments.filter(Boolean);
    return db.get.apply(db, args);
}

app.post('/users', (req, res, next) => {
    const { body } = req;

    const { page, pageSize, filters: filtersObj, sort, limit } = body;
    let countQuery = 'SELECT COUNT(*) as totalRecords FROM users';
    let query = 'SELECT * FROM users LIMIT ?';
    let queryParams = null;
    let params = pageSize;
    
    const filters = Object.keys(filtersObj).map(key => ({ ...filtersObj[key] }));
    
    if (filters?.length || sort || limit) {
        const offset = page * pageSize;
        query = 'SELECT * FROM users';
        params = [];

        filters?.forEach((filter, index) => {
            if (index === 0) {
                query += ' WHERE';
            } else {
                query += ' AND';
            }

            if (filter.key === 'All') {
                query += ' name like ? OR email like ? OR phone like ? OR company like ? OR location like ? OR department like ? OR childs like ? OR coworkers like ? OR test like ?';
                params.push(...Array.from({ length: 9 }, () => `%${filter.value}%`))
            } else {
                query += ` ${filter.model} like ?`;
                params.push(`%${filter.value}%`);
            }
        });

        if (sort) {
            query += ` ORDER BY ${sort.column} ${sort.order}`;
        }

        query += ' LIMIT ?';
        params.push(limit || pageSize);

        if (offset) {
            query += ' OFFSET ?';
            params.push(offset);
        }

        if (filters.length) {
            queryParams = params;
        }

        countQuery = `SELECT COUNT(*) as totalRecords FROM users ${filters.length ? `WHERE ${query.split('WHERE')[1]}` : ''}`;
    }

    dynamicGet(countQuery, queryParams, (err, { totalRecords }) => {
        if (err) {
            return next(err);
        }
        return db.all(query, params, (err, users) => {
            if (err) {
                return next(err);
            }
            res.send({
                data: users,
                totalRecords,
                page
            });
        });
    });
});

app.listen(PORT, () => {
    console.log('server is up and running on port 9000')
});