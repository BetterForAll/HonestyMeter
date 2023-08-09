
import React from 'react'
import { getBaseUrl } from '../utils/utils'
import { POST } from '../../server/constants/rest_methods'

// Draft page, just to test the API

const baseUrl = getBaseUrl();
const PATH = 'api/saved_reports'
const URL = `${baseUrl}${PATH}`;

export default function Reports({ allReports }) {

    return (
        <>
            {
                allReports.map((report) => {
                    return (
                        <div key={report._id}>
                            <h1>{report.title}</h1>
                            <p>{report.content}</p>
                            <p>{report._id}</p>
                        </div>
                    )
                })
            }
            <button onClick={createReport}>CREATE REPORT</button>
        </>

    )
}

export async function getServerSideProps(context) {
    const { req } = context;
    const host = req?.headers?.host
    const url = `http://${host}/${PATH}`;

    try {
        const res = await fetch(url);

        const { data: allReports } = await res.json();

        return { props: { allReports } }
    } catch (error) {
        console.log({ error })
    }
}

const createReport = async () => {
    let res = await fetch(URL, {
        method: POST,
        body: JSON.stringify({
            title: 'New ' + Math.floor(Math.random() * 1000000),
            content: 'New content',
        }),
    });
    res = await res.json();
};
