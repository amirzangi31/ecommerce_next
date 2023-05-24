import { IncomingForm } from 'formidable'
import { promises as fs } from 'fs'
import { isAdminRequest } from '../auth/[...nextauth]';
import connectDB from '@/utils/connectDB';
import { getSession } from 'next-auth/react';

var mv = require('mv');


export const config = {
    api: {
        bodyParser: false,
    }
};

export default async function handler(req, res) {
    try {
        await connectDB();
    } catch (err) {
        return res
            .status(500)
            .json({ status: "failed", message: "Error to connecting to db!" });
    }
    const session = await getSession({ req })
    if (!session || session.user.name !== "admin") {
        return res.status(401).json({ status: "failed", message: "You are not logged in!" })
    }

    const data = await new Promise((resolve, reject) => {
        const form = new IncomingForm()
        form.parse(req, (err, fields, files) => {
            if (err) return reject(err)
            var oldPath = files.file.filepath;
            var newPath = `./public/images/products/${files.file.originalFilename}`;
            mv(oldPath, newPath, function (err) {
                res.status(200).json({ fields, files, test: "success" })
            });
        })
    })

}